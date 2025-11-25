import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminDashboard } from '@/components/admin/dashboard'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Validate email - only allow fotoflo@gmail.com
  if (user.email !== 'fotoflo@gmail.com') {
    // Sign out unauthorized user and redirect to login
    await supabase.auth.signOut()
    redirect('/admin/login?error=unauthorized')
  }

  return <AdminDashboard user={user} />
}

export const metadata = {
  title: 'Admin Dashboard | ClimateFair',
  description: 'ClimateFair blog administration dashboard',
}
