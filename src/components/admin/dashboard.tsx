'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface User {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}

interface AdminDashboardProps {
  user: User
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({
    posts: 0,
    views: '1.2K',
    comments: 12
  })
  const supabase = createClient()

  // Load real statistics
  useEffect(() => {
    const loadStats = async () => {
      try {
        // Fetch posts count from cache
        const response = await fetch('/posts-cache.json')
        if (response.ok) {
          const posts = await response.json()
          setStats(prev => ({ ...prev, posts: Array.isArray(posts) ? posts.length : 0 }))
        }
      } catch (error) {
        console.error('Error loading stats:', error)
      }
    }

    loadStats()
  }, [])

  console.log('Dashboard component: user received', { email: user?.email, id: user?.id })

  const signOut = async () => {
    setIsLoading(true)
    try {
      await supabase.auth.signOut()
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ClimateFair Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Welcome back, {user.user_metadata?.full_name || <span data-email>{user.email}</span>}!
            </p>
            <p className="text-xs text-gray-500">Administrator Access</p>
          </div>
          <Button onClick={signOut} disabled={isLoading} variant="outline">
            {isLoading ? 'Signing out...' : 'Sign Out'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage your blog content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{stats.posts}</p>
              <p className="text-sm text-gray-600">Published posts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View site statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{stats.views}</p>
              <p className="text-sm text-gray-600">Page views this month</p>
              <p className="text-xs text-gray-400 mt-1">Analytics tracking needed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>Moderate user comments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-600">{stats.comments}</p>
              <p className="text-sm text-gray-600">Pending approval</p>
              <p className="text-xs text-gray-400 mt-1">Comment system needed</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest admin actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Post published: "Big Apple Compost Initiative"</p>
                    <p className="text-xs text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">
                      Administrator signed in: <span data-email>{user.email}</span>
                    </p>
                    <p className="text-xs text-gray-600">Just now</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
