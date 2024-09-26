'use server'

import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import prisma from '@/lib/prisma/prisma'
import { cookies } from 'next/headers'

async function checkPassword(password: string) { // DBからパスワードを取得して比較
  const hashedPassword = await prisma.padLock.findMany({
    where: {
      is_deleted: {
        not: true,
      }
    },
    select: {
      id: true,
      password: true,
    }
  })

  hashedPassword.forEach(async (padlock) => {
    const match = await compare(password, padlock.password)
    if (match) {
      return true
    }
  })
  return false
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  let failCount = Number(cookies().get('failCount')) || 0

  if (!body.password) {
    return new Response('Missing required query parameters', { status: 400 })
  }

  if (await checkPassword(body.password)) {
    cookies().set('failCount', '0', {maxAge: 60 * 60 * 24})
    cookies().set('isLocked', 'false', {maxAge: 60 * 60 * 24 * 30}) // 一か月持つ
    return NextResponse.json({ response: 'success' }, { status: 200 })
  } else {
    failCount += 1
    cookies().set('failCount', failCount.toString(), {maxAge: 60 * 60 * 24})
    if (failCount >= 5) {
      cookies().set('isLocked', 'true', {maxAge: 60 * 60 * 24})
      return NextResponse.json({ error: 'パスワードを5回以上間違えたため、ログインできません' }, { status: 401 })
    }
    return NextResponse.json({ error: 'パスワードが違います' }, { status: 401 })
  }

}