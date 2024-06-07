import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma'
import { v4 } from 'uuid'

type BookingBody = {
	booking_date: Date
	booking_time: number
	regist_name: string
	name: string
	password: string
}

export async function POST(request: NextRequest) {
	const body = (await request.json()) as unknown as BookingBody

	try {
    const atBooking = await prisma.booking.findFirst({
      where: {
        booking_date: body.booking_date,
        booking_time: body.booking_time,
      },
    })
    console.log(atBooking)
    if (atBooking) {
      return NextResponse.json(
        { error: 'すでに予約が入っています。' },
        { status: 400 }
      )
    }
		await prisma.booking.create({
			data: {
				id: v4(),
				created_at: new Date(),
				booking_date: body.booking_date,
				booking_time: body.booking_time,
				regist_name: body.regist_name,
				name: body.name,
				password: body.password,
			},
		})
		return NextResponse.json({ status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch bookings' },
			{ status: 500 },
		)
	}
}
