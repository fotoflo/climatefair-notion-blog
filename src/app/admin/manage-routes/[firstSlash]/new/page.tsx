import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminLayout } from '@/components/admin/layout/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react'

interface NewPageProps {
  params: Promise<{ firstSlash: string }>
}

export default async function NewPage({ params }: NewPageProps) {
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
            <h1 className="text-3xl font-bold text-gray-900">New Page in /{firstSlash}</h1>
            <p className="mt-2 text-gray-600">
              Create a new content page for this route category
            </p>
          </div>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Create New Content</CardTitle>
              <CardDescription>
                Add new pages by creating entries in your Notion database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Required Fields in Notion:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span><strong>firstSlash:</strong> "{firstSlash}"</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span><strong>post-title:</strong> Your page title (URL slug)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span><strong>Status:</strong> "Done"</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span><strong>Work Tags:</strong> "Published Blog Post"</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">URL Structure:</h4>
                  <p className="text-blue-800 font-mono">
                    https://climatefair.co/{firstSlash}/[your-post-title]
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="https://www.notion.so/your-database-url" target="_blank">
                  <Button>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Notion Database
                  </Button>
                </Link>

                <Link href={`/admin/manage-routes/${firstSlash}`}>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage Existing Pages
                  </Button>
                </Link>
              </div>

              <div className="text-sm text-gray-600">
                <p>
                  <strong>Next steps:</strong> After creating the page in Notion with the required fields,
                  run <code className="bg-gray-100 px-1 py-0.5 rounded">pnpm run cache:posts</code> to update the site.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export async function generateMetadata({ params }: NewPageProps) {
  const { firstSlash } = await params
  return {
    title: `New Page in /${firstSlash} | ClimateFair Admin`,
    description: `Create a new content page in the ${firstSlash} route category`,
  }
}
