import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminLayout } from '@/components/admin/layout/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, ExternalLink, Edit, FileText } from 'lucide-react'
import { getPostsFromCache } from '@/lib/notion'

interface FirstSlashPageProps {
  params: Promise<{ firstSlash: string }>
}

export default async function FirstSlashPage({ params }: FirstSlashPageProps) {
  const supabase = await createClient()
  const { firstSlash } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  if (user.email !== 'fotoflo@gmail.com') {
    await supabase.auth.signOut()
    redirect('/admin/login?error=unauthorized')
  }

  const posts = getPostsFromCache()

  // Filter posts by firstSlash
  const categoryPosts = posts.filter(post => post.firstSlash === firstSlash)

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/manage-routes">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Routes
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">/{firstSlash}</h1>
              <p className="mt-2 text-gray-600">
                Manage pages in the {firstSlash} category
              </p>
            </div>
          </div>
          <Link href={`/admin/manage-routes/${firstSlash}/new`}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Page
            </Button>
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{categoryPosts.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Published</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {categoryPosts.filter(post => post.tags?.includes('Published Blog Post')).length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Route Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-mono">/{firstSlash}/:slug</p>
            </CardContent>
          </Card>
        </div>

        {/* Pages List */}
        <Card>
          <CardHeader>
            <CardTitle>Pages in /{firstSlash}</CardTitle>
            <CardDescription>
              All content pages under this route category
            </CardDescription>
          </CardHeader>
          <CardContent>
            {categoryPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
                <p className="text-gray-600 text-center mb-4">
                  This category doesn't have any pages yet.
                </p>
                <Link href={`/admin/manage-routes/${firstSlash}/new`}>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Page
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {categoryPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium">{post.title}</h3>
                        <Badge variant="secondary">
                          /{firstSlash}/{post.postTitle || post.slug}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Published: {new Date(post.date).toLocaleDateString()}</span>
                        {post.author && <span>Author: {post.author}</span>}
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Link
                        href={
                          post.firstSlash && post.postTitle
                            ? `/${post.firstSlash}/${post.postTitle}`
                            : `/blog/${post.slug}`
                        }
                        target="_blank"
                      >
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>

                      <Link href={`/admin/manage-routes/${firstSlash}/${post.postTitle || post.slug}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export async function generateMetadata({ params }: FirstSlashPageProps) {
  const { firstSlash } = await params
  return {
    title: `Manage /${firstSlash} | ClimateFair Admin`,
    description: `Manage pages in the ${firstSlash} route category`,
  }
}
