import { CookieSerializeOptions } from 'cookie'
import { NextAuthOptions } from 'next-auth'
// eslint-disable-next-line import/no-named-as-default
import CredentialsProvider from 'next-auth/providers/credentials'
import { getAllowedExternalUrlOriginList } from '@/libs/allowedExternalUrlOriginList'
import jwtCallback from '@/libs/auth/jwtCallback'
import loginWithEmailAndPassword from '@/libs/auth/loginWithEmailAndPassword'
import loginWithLoginIdAndPassword from '@/libs/auth/loginWithLoginIdAndPassword'
import sessionCallback from '@/libs/auth/sessionCallback'
import signOutEvent from '@/libs/auth/signOutEvent'

export const rememberMeCookieName = 'remember-me'

export const getAuthOptionsMaxAge = (value: string = 'off'): number => {
  return value === 'on' ? 60 * 60 * 24 * 30 : 60 * 60 * 24
}

export const rememberMeCookieOptions: CookieSerializeOptions = {
  httpOnly: false,
  path: '/',
  sameSite: 'lax',
  secure: process.env.NEXTAUTH_URL?.startsWith('https://'),
}

export const emailCredentialsProvider = CredentialsProvider({
  id: 'email',
  credentials: {
    provider: { label: 'Provider', type: 'text', hidden: true },
    username: { label: 'Username', type: 'text', placeholder: 'email' },
    password: { label: 'Password', type: 'password' },
    rememberMe: { label: 'rememberMe', type: 'checkbox' },
  },
  authorize: async (credentials: any, req: any) => {
    if (credentials && credentials.username && credentials.password) {
      return await loginWithEmailAndPassword(credentials.username, credentials.password)
    }
    return null
  },
})

const loginIdCredentialsProvider = CredentialsProvider({
  id: 'loginId',
  credentials: {
    provider: { label: 'Provider', type: 'text', hidden: true },
    username: { label: 'Username', type: 'text', placeholder: 'login id' },
    password: { label: 'Password', type: 'password' },
    rememberMe: { label: 'rememberMe', type: 'checkbox' },
  },
  authorize: async (credentials: any, req: any) => {
    if (credentials && credentials.username && credentials.password) {
      return await loginWithLoginIdAndPassword(credentials.username, credentials.password)
    }
    return null
  },
})

export const authOptions = (maxAge: number): NextAuthOptions => {
  return {
    providers: [emailCredentialsProvider, loginIdCredentialsProvider],
    session: {
      strategy: 'jwt',
      maxAge,
    },
    jwt: {
      maxAge,
    },
    pages: {
      signIn: '/login',
      error: '/login', // Error code passed in query string as ?error=
      signOut: '/logout',
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        if (url.startsWith('/')) return `${baseUrl}${url}`
        else if (new URL(url).origin === baseUrl) return url
        else if (getAllowedExternalUrlOriginList().includes(new URL(url).origin)) return url
        return baseUrl
      },
      async jwt({ token, user, account, trigger, session }) {
        return await jwtCallback({ token, user, account, trigger, session })
      },
      async session({ session, token }) {
        return sessionCallback({ session, token })
      },
    },
    events: {
      signOut: async (message) => {
        await signOutEvent(message)
      },
    },
    debug: process.env.NODE_ENV === 'development',
    //logger
  }
}