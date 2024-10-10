'use server'

import { NextRequest, NextResponse } from 'next/server'
import { compareSync } from 'bcryptjs'
import prisma from '@/lib/prisma/prisma'
import { cookies } from 'next/headers'

const oneDay = 60 * 60 * 24
const oneMonth = 60 * 60 * 24 * 30

/**
 * DBからパスワードを取得し、入力されたパスワードと照合する関数
 */
async function checkPassword(password: string) {
	const hashedPassword = await prisma.padLock.findMany({
		where: {
			is_deleted: {
				not: true,
			},
		},
		select: {
			id: true,
			password: true,
		},
	})
	let match = false

	hashedPassword.forEach(async (padlock) => {
		match = compareSync(password, padlock.password)
	})
	return match
}

export async function POST(request: NextRequest) {
	const cookieStore = cookies()
	const body = await request.json()
	let failCount = Number(cookieStore.get('failCount')?.value) || 0

	if (!body.password) {
		return new Response('Missing required query parameters', { status: 400 })
	}

	if (await checkPassword(body.password)) {
		cookieStore.set('failCount', '0', { maxAge: oneDay }) // 一日持つ
		cookieStore.set('isLocked', 'false', { maxAge: oneMonth }) // 一か月持つ
		return NextResponse.json({ response: 'success' }, { status: 200 })
	} else {
		if (failCount >= 5) {
			cookies().set('isLocked', 'true', { maxAge: oneDay }) // 一日持つ
			return NextResponse.json(
				{ error: 'パスワードを5回以上間違えたため、ログインできません' },
				{ status: 401 },
			)
		} else {
			failCount += 1
			cookies().set('failCount', failCount.toString(), { maxAge: oneDay }) // 一日持つ
			return NextResponse.json(
				{ error: 'パスワードが違います' },
				{ status: 401 },
			)
		}
	}
}
