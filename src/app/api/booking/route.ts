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
      const bookings = await prisma.booking.findMany({
        where: {
          booking_date: {
            gte: new Date(startDay as string),
            lte: new Date(endDay as string),
          },
        },
        select: {
          id: true,
          created_at: true,
          booking_date: true,
          booking_time: true,
          regist_name: true,
          name: true,
        },
        orderBy: [
          { booking_date: 'asc' },
          { booking_time: 'asc' },
        ],
      });
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