import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminLayout } from '@/components/admin/layout/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, FileText, ExternalLink, Edit } from 'lucide-react'
import { getPostsFromCache } from '@/lib/notion'

export default async function ManageRoutesPage() {
  const supabase = await createClient()

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

  // Group posts by firstSlash
  const routesByFirstSlash = posts.reduce((acc: Record<string, any[]>, post) => {
    if (post.firstSlash) {
      if (!acc[post.firstSlash]) {
        acc[post.firstSlash] = []
      }
      acc[post.firstSlash].push(post)
    }
    return acc
  }, {})

  // Get unique firstSlash values and sort them
  const firstSlashes = Object.keys(routesByFirstSlash).sort()

  // Get posts without firstSlash
  const postsWithoutRoutes = posts.filter(post => !post.firstSlash)

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Route Management</h1>
            <p className="mt-2 text-gray-600">Manage your nested URL routes and content</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Route Category
          </Button>
        </div>

        {/* Route Categories */}
        <div className="grid gap-6">
          {firstSlashes.map((firstSlash) => {
            const routes = routesByFirstSlash[firstSlash]
            return (
              <Card key={firstSlash}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl">/{firstSlash}</CardTitle>
                      <CardDescription>
                        {routes.length} page{routes.length !== 1 ? 's' : ''} in this category
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/manage-routes/${firstSlash}`}>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </Link>
                      <Link href={`/admin/manage-routes/${firstSlash}/new`}>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          New Page
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {routes.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-gray-600">
                            /{firstSlash}/{post.postTitle || post.slug}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={
                              post.firstSlash && post.postTitle
                                ? `/${post.firstSlash}/${post.postTitle}`
                                : `/blog/${post.slug}`
                            }
                            target="_blank"
                          >
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/manage-routes/${firstSlash}/${post.postTitle || post.slug}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                    {routes.length > 3 && (
                      <p className="text-sm text-gray-500 text-center">
                        +{routes.length - 3} more pages
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Posts without routes */}
          {postsWithoutRoutes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Uncategorized Posts</CardTitle>
                <CardDescription>
                  {postsWithoutRoutes.length} post{postsWithoutRoutes.length !== 1 ? 's' : ''} without nested routes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {postsWithoutRoutes.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-gray-600">/blog/{post.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/posts`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty state */}
          {firstSlashes.length === 0 && postsWithoutRoutes.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No routes configured</h3>
                <p className="text-gray-600 text-center mb-4">
                  Create your first nested route to organize your content better.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Route
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export const metadata = {
  title: 'Manage Routes | ClimateFair Admin',
  description: 'Manage nested URL routes and content organization',
}
