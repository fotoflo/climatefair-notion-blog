import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AuthForm } from '@/components/admin/auth-form'

interface AdminLoginPageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const supabase = await createClient()
  const params = await searchParams

  // Check session first
  const { data: sessionData } = await supabase.auth.getSession()
  console.log('Login: session check', {
    hasSession: !!sessionData.session,
    userFromSession: sessionData.session?.user?.email
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log('Login: user check', {
    user: !!user,
    email: user?.email,
    error: params.error
  })

  if (user) {
    console.log('Login: user found, redirecting to dashboard')
    redirect('/admin/dashboard')
  }

  const getErrorMessage = (error?: string) => {
    switch (error) {
      case 'unauthorized':
        return 'Access denied. Only authorized administrators can sign in.'
      case 'auth-failed':
        return 'Authentication failed. Please try again.'
      default:
        return null
    }
  }

  const errorMessage = getErrorMessage(params.error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ClimateFair Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the administration dashboard
          </p>
          {errorMessage && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-center">
              {errorMessage}
            </div>
          )}
        </div>
        <AuthForm />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Admin Login | ClimateFair',
  description: 'ClimateFair blog administration login',
}
