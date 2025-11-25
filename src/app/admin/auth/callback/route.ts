import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  if (error) {
    console.log('Callback: OAuth error:', error, errorDescription)
    return NextResponse.redirect(new URL(`/admin/login?error=${error}`, request.url))
  }

  // Create Supabase client to establish session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        },
      },
    }
  )

  // Refresh the session
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  console.log('Callback: session refresh', {
    hasUser: !!user,
    email: user?.email,
    error: userError?.message
  })

  if (userError || !user) {
    console.log('Callback: no user after OAuth, redirecting to login')
    return NextResponse.redirect(new URL('/admin/login?error=no-session', request.url))
  }

  // Successful OAuth - redirect to dashboard
  console.log('Callback: OAuth successful, redirecting to dashboard for user:', user.email)
  return NextResponse.redirect(new URL('/admin/dashboard', request.url))
}