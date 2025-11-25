import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminLayout } from '@/components/admin/layout/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ExternalLink, Edit3, Calendar, User } from 'lucide-react'
import { getPostsFromCache } from '@/lib/notion'

interface EditPageProps {
  params: Promise<{ firstSlash: string; title: string }>
}

export default async function EditPage({ params }: EditPageProps) {
  const supabase = await createClient()
  const { firstSlash, title } = await params

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

  // Find the post by firstSlash and title (could be postTitle or slug)
  const post = posts.find(p =>
    p.firstSlash === firstSlash && (p.postTitle === title || p.slug === title)
  )

  if (!post) {
    redirect('/admin/manage-routes')
  }

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href={`/admin/manage-routes/${firstSlash}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to /{firstSlash}
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Page</h1>
            <p className="mt-2 text-gray-600">
              /{firstSlash}/{post.postTitle || post.slug}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Content</CardTitle>
                <CardDescription>
                  Edit this page by modifying the corresponding entry in Notion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Title</label>
                  <p className="mt-1 text-lg font-medium">{post.title}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-gray-600">{post.description}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Content Preview</label>
                  <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 line-clamp-3">
                      {post.content ? post.content.replace(/[#*`]/g, '').substring(0, 200) + '...' : 'No content available'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO & Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">URL</label>
                  <p className="mt-1 font-mono text-sm">
                    https://climatefair.co/{firstSlash}/{post.postTitle || post.slug}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Open Graph Image</label>
                  <div className="mt-1">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt="Cover image"
                        className="w-32 h-20 object-cover rounded border"
                      />
                    ) : (
                      <p className="text-gray-500">No cover image</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  href={
                    post.firstSlash && post.postTitle
                      ? `/${post.firstSlash}/${post.postTitle}`
                      : `/blog/${post.slug}`
                  }
                  target="_blank"
                >
                  <Button className="w-full" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live Page
                  </Button>
                </Link>

                <Button className="w-full">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit in Notion
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Page Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Published: {new Date(post.date).toLocaleDateString()}</span>
                </div>

                {post.author && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>Author: {post.author}</span>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Tags</label>
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    )) || (
                      <span className="text-gray-500 text-sm">No tags</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Route Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">First Slash</label>
                  <p className="mt-1 font-mono text-sm">{post.firstSlash || 'None'}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Post Title (Slug)</label>
                  <p className="mt-1 font-mono text-sm">{post.postTitle || post.slug}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Full URL</label>
                  <p className="mt-1 font-mono text-xs break-all">
                    {post.firstSlash && post.postTitle
                      ? `/${post.firstSlash}/${post.postTitle}`
                      : `/blog/${post.slug}`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export async function generateMetadata({ params }: EditPageProps) {
  const { firstSlash, title } = await params
  return {
    title: `Edit /${firstSlash}/${title} | ClimateFair Admin`,
    description: `Edit the page at ${firstSlash}/${title}`,
  }
}
