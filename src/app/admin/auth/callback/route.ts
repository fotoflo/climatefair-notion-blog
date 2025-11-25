import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  if (error) {
    console.log('Callback: OAuth error:', error, errorDescription)
    return NextResponse.redirect(new URL(`/admin/login?error=${error}`, request.url))
  }

  if (!code) {
    console.log('Callback: no code parameter, redirecting to login')
    return NextResponse.redirect(new URL('/admin/login?error=no-code', request.url))
  }

  // Create response for redirect
  let response = NextResponse.redirect(new URL('/admin/dashboard', request.url))

  // Create Supabase client with cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Set cookies on the response
            if (options) {
              response.cookies.set(name, value, options)
            } else {
              response.cookies.set(name, value)
            }
          })
        },
      },
    }
  )

  // Exchange the code for a session
  const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

  console.log('Callback: code exchange result', {
    hasSession: !!data.session,
    hasUser: !!data.user,
    userEmail: data.user?.email,
    error: exchangeError?.message
  })

  if (exchangeError || !data.session || !data.user) {
    console.log('Callback: session exchange failed, redirecting to login')
    response = NextResponse.redirect(new URL('/admin/login?error=session-exchange-failed', request.url))
    return response
  }

  // Successful OAuth - redirect to dashboard with session cookies
  console.log('Callback: OAuth successful, redirecting to dashboard for user:', data.user.email)
  return response
}