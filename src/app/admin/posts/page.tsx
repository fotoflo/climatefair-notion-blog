import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminLayout } from '@/components/admin/layout/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Plus, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { getPostsFromCache } from '@/lib/notion'

export default async function AdminPostsPage() {
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

  return (
    <AdminLayout user={user}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Posts Management</h1>
            <p className="mt-2 text-gray-600">Manage your blog posts and content</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        <div className="grid gap-6">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-600 text-center mb-4">
                  Get started by creating your first blog post in Notion.
                </p>
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Notion Database
                </Button>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                      <CardDescription className="text-base mb-3">
                        {post.description}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Published: {new Date(post.date).toLocaleDateString()}</span>
                        {post.author && <span>Author: {post.author}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={post.firstSlash && post.postTitle
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
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {post.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export const metadata = {
  title: 'Posts Management | ClimateFair Admin',
  description: 'Manage blog posts and content',
}
