import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import NextAuth from 'next-auth'
import {
  rememberMeCookieName,
  getAuthOptionsMaxAge,
  authOptions,
  rememberMeCookieOptions,
} from '@/libs/auth/authOptions'
import { NextAuthRouteHandlerContext } from '@/types/NextAuth'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const NextAuthHandler = async (request: NextRequest, context: NextAuthRouteHandlerContext) => {
  const cookieStore = cookies()
  let maxAge = getAuthOptionsMaxAge()

  if (context.params.nextauth[0] === 'callback') {
    //ログインの時、 SignInAuthorizationParams の keep から maxAge を調整
    const isKeep = request.nextUrl.searchParams.get('keep') ?? 'off'
    maxAge = getAuthOptionsMaxAge(isKeep)

    if (isKeep === 'on') {
      // Remember Me Cookie の作成
      cookieStore.set({
        name: rememberMeCookieName,
        value: isKeep,
        maxAge,
        ...rememberMeCookieOptions,
      })
    }
  } else {
    // Remember Me Cookie の値から maxAge を調整
    const rememberMeCookie = cookieStore.get(rememberMeCookieName)
    const rememberMeCookieValue = rememberMeCookie?.value
    maxAge = getAuthOptionsMaxAge(rememberMeCookieValue)

    if (rememberMeCookieValue === 'on') {
      // Remember Me Cookie の更新
      cookieStore.set({
        name: rememberMeCookieName,
        value: rememberMeCookieValue,
        maxAge,
        ...rememberMeCookieOptions,
      })
    }
  }

  return NextAuth(request, context, authOptions(maxAge))
}

export { NextAuthHandler as GET, NextAuthHandler as POST }