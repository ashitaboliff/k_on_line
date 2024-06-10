import { NextAuthOptions } from 'next-auth'
import CredentionsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	// 必要なプロバイダーは複数設定できる
	// Credentialは普通のIDパスワード方式
	providers: [
		CredentionsProvider({
			name: 'Credentials',
			credentials: {
				id: {
					label: 'id',
					type: 'text',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials, req) {
				// ここでユーザー認証を行う？
				// テスト用のユーザー
				const user = { id: '1', name: 'Taro', email: 'test@example.com' }
				if (user) {
					return user
				} else {
					return null
				}
			},
		}),
		CredentionsProvider({
			name: 'Credentials',
			credentials: {
				id: {
					label: 'id',
					type: 'text',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials, req) {
				// ここでユーザー認証を行う？
				// テスト用のユーザー
				const user = { id: '1', name: 'Taro', email: 'test@example.com' }
				if (user) {
					return user
				} else {
					return null
				}
			},
		}),
	],
	// ログインページとかのURLを変えたい場合pagesを設定する
	// pages: {
	//   signIn: '/auth/signin',
	//   signOut: '/auth/signout',
	//   error: '/auth/error', // Error code passed in query string as ?error=
	//   verifyRequest: '/auth/verify-request', // (used for check email message)
	//   newUser: '/auth/new-user'
	// }
}
export default authOptions
