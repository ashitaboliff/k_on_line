import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma'
import { v4 } from 'uuid'
import { JSTToUTC, UTCToJST } from '@/lib/CommonFunction'
import bcryptjs from 'bcryptjs'

type BookingBody = {
	booking_date: Date // JTS
	booking_time: number
	regist_name: string
	name: string
	password: string
}

export async function POST(request: NextRequest) {
	const body = (await request.json()) as unknown as BookingBody
	const UTCbookingDate = UTCToJST(new Date(body.booking_date))
	const today = new Date()
	const todaySetTime = new Date(today.setHours(0, 0, 0, 0))

	if (
		UTCbookingDate < todaySetTime ||
		UTCbookingDate >
			new Date(
				todaySetTime.getFullYear(),
				todaySetTime.getMonth(),
				todaySetTime.getDate() + 13,
			)
	) {
		return NextResponse.json({ error: '予約可能時間外です。' }, { status: 302 })
	}

	try {
		const searchBookingDate = JSTToUTC(UTCbookingDate)
		const atBooking = await prisma.booking.findFirst({
			where: {
				AND: {
					booking_date: searchBookingDate,
					booking_time: body.booking_time,
					is_deleted: {
						not: true,
					},
				},
			},
		})
		if (atBooking) {
			return NextResponse.json(
				{ error: 'すでに予約が入っています。' },
				{ status: 400 },
			)
		}
		const hashedPassword = bcryptjs.hashSync(body.password, 5)
		await prisma.booking.create({
			data: {
				id: v4(),
				created_at: new Date(),
				booking_date: body.booking_date,
				booking_time: body.booking_time,
				regist_name: body.regist_name,
				name: body.name,
				password: hashedPassword,
			},
		})
		return NextResponse.json({ status: 200 })
	} catch (error) {
		// console.error(error)
		return NextResponse.json(
			{ error: 'Failed to fetch bookings' },
			{ status: 500 },
		)
	}
}
