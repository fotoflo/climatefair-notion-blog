'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  Users,
  Database
} from 'lucide-react'

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and statistics'
  },
  {
    title: 'Posts',
    href: '/admin/posts',
    icon: FileText,
    description: 'Manage blog posts'
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    description: 'View site analytics'
  },
  {
    title: 'Comments',
    href: '/admin/comments',
    icon: MessageSquare,
    description: 'Moderate comments'
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
    description: 'User management'
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'System settings'
  },
  {
    title: 'Database',
    href: '/admin/database',
    icon: Database,
    description: 'Database management'
  }
]

interface AdminNavProps {
  className?: string
}

export function AdminNav({ className }: AdminNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('space-y-2', className)}>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Administration
        </h2>
        <div className="space-y-1">
          {adminNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
