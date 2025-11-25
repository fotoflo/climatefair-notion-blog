import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminLayout } from '@/components/admin/layout/admin-layout'
import { AdminDashboard } from '@/components/admin/dashboard'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Check session first
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  console.log('Dashboard: session check', {
    hasSession: !!sessionData.session,
    sessionError,
    userFromSession: sessionData.session?.user?.email
  })

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  console.log('Dashboard: user check', {
    user: !!user,
    email: user?.email,
    userId: user?.id,
    error: error?.message,
    errorCode: error?.status
  })

  if (!user) {
    console.log('Dashboard: no user, redirecting to login')
    redirect('/admin/login?error=no-user')
  }

  // Validate email - only allow fotoflo@gmail.com
  if (user.email !== 'fotoflo@gmail.com') {
    console.log('Dashboard: unauthorized email, signing out:', user.email)
    // Sign out unauthorized user and redirect to login
    await supabase.auth.signOut()
    redirect('/admin/login?error=unauthorized')
  }

  console.log('Dashboard: access granted for', user.email)
  return (
    <AdminLayout user={user}>
      <AdminDashboard user={user} />
    </AdminLayout>
  )
}

export const metadata = {
  title: 'Admin Dashboard | ClimateFair',
  description: 'ClimateFair blog administration dashboard',
}
