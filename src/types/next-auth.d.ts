import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user_id: string
	}
	interface User {
		user_id: string
	}
}
