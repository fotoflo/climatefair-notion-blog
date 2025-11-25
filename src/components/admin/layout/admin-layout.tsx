'use client'

import { useState } from 'react'
import { AdminNav } from './admin-nav'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

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
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-sm border-r">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-xl font-bold text-gray-900">ClimateFair Admin</h1>
          </div>
          <AdminNav />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex h-16 shrink-0 items-center">
              <h1 className="text-xl font-bold text-gray-900">ClimateFair Admin</h1>
            </div>
            <AdminNav className="mt-5" />
          </SheetContent>
        </Sheet>

        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          ClimateFair Admin
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user.user_metadata?.full_name || user.email}
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
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Desktop Header */}
        <div className="sticky top-0 z-40 hidden lg:flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <span className="text-sm text-gray-600">
                Welcome back, {user.user_metadata?.full_name || <span data-email>{user.email}</span>}!
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
    </div>
  )
}
