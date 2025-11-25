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

  return <AdminDashboard user={user} />
}

export const metadata = {
  title: 'Admin Dashboard | ClimateFair',
  description: 'ClimateFair blog administration dashboard',
}
