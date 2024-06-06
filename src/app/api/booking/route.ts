import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const startDay = params.get("startDay")
  const endDay = params.get("endDay")
    console.log('startDay:', new Date(startDay as string))

    if (!startDay || !endDay) {
      return NextResponse.json(
        { error: 'Invalid query' },
        { status: 400 }
      )
    }

    try {
      const bookings = await prisma.booking.findMany()
      return NextResponse.json(
        { response: bookings },
        { status: 200 },
      )
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      )
    }
}