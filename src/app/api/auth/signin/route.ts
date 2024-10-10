import { signIn } from 'next-auth/react'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const body = await request.json()
	const params = request.nextUrl.searchParams
	const signinType = params.get('signinType')

	if (!signinType) {
		return new Response('Missing required query parameters', { status: 400 })
	} else if (signinType === 'Admin') {
		try {
			await signIn('AdminCredentials', {
				user_id: body.user_id,
				password: body.password,
				callbackUrl: '/admin',
			})
		} catch (error) {
			return NextResponse.json(
				{ error: 'Invalid credentials' + error },
				{ status: 401 },
			)
		}
	} else if (signinType === 'Line') {
		try {
			await signIn('line')
		} catch (error) {
			console.error(error)
			return NextResponse.json(
				{ error: 'Invalid credentials' + error },
				{ status: 401 },
			)
		}
	} else {
		return new Response('Invalid query', { status: 400 })
	}
}
