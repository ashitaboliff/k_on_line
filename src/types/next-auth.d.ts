import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user_id: string
		name: string
		image: string
	}
	interface User {
		user_id: string?
	}
}
