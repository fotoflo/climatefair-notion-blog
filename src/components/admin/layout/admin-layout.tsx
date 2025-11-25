'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, LogOut, LayoutDashboard, FileText, BarChart3, MessageSquare, Settings, Users, Database } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Posts',
    href: '/admin/posts',
    icon: FileText,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Comments',
    href: '/admin/comments',
    icon: MessageSquare,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
  {
    title: 'Database',
    href: '/admin/database',
    icon: Database,
  }
]

interface AdminLayoutProps {
  children: React.ReactNode
  user: {
    id: string
    email?: string
    user_metadata?: {
      full_name?: string
      avatar_url?: string
    }
  }
}

export function AdminLayout({ children, user }: AdminLayoutProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const supabase = createClient()

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
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">ClimateFair Admin</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                )
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-sm text-gray-600">
                {user.user_metadata?.full_name || <span data-email>{user.email}</span>}
              </span>
              <Button
                onClick={signOut}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isLoading ? 'Signing out...' : 'Sign Out'}
              </Button>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-bold text-gray-900">ClimateFair Admin</h1>
                      </div>
                      <nav className="flex-1">
                        <div className="space-y-2">
                          {adminNavItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  'flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors w-full',
                                  isActive
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                )}
                              >
                                <Icon className="h-5 w-5" />
                                <div>
                                  <div>{item.title}</div>
                                  <div className="text-xs text-gray-500">{item.description}</div>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main className="py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
