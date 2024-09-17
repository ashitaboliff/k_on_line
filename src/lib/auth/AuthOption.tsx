import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import LineProvider from 'next-auth/providers/line'
import { CookieSerializeOptions } from 'cookie'
import { compare } from 'bcryptjs'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	debug: process.env.NODE_ENV === 'development',
	session: { strategy: 'jwt' },
	providers: [
		LineProvider({
			clientId: process.env.LINE_CLIENT_ID,
			clientSecret: process.env.LINE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: 'GeneralCredentials',
			credentials: {
				user_id: { label: 'user_id', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const user = await prisma.User.findFirst({
					where: { user_id: credentials?.user_id },
				})
				if (
					user &&
					(await compare(credentials?.password || '', user.password))
				) {
					return user
				} else {
					return null
				}
			},
		}),
		CredentialsProvider({
			name: 'AdminCredentials',
			credentials: {
				user_id: { label: 'user_id', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (
					credentials?.user_id === process.env.ADMIN_ID &&
					credentials?.password === process.env.ADMIN_PASSWORD
				) {
					return { user_id: process.env.ADMIN_ID } as any
				}
				return null
			},
		}),
		CredentialsProvider({
			name: 'TestCredentials',
			credentials: {
				user_id: { label: 'user_id', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (
					credentials?.user_id === process.env.TEST_ID &&
					credentials?.password === process.env.TEST_PASSWORD
				) {
					return { user_id: 'test' } as any
				}
				return null
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user_id = user.user_id
			}
			return token
		},
		async session({ session, token }) {
			session.user_id = token.user_id as string
			return session
		},
	},
}
