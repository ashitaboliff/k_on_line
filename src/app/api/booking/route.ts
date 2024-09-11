import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma'
import { UTCToJST, JSTToUTC } from '@/lib/CommonFunction'
import { TIME_LIST } from '@/lib/enum/BookingEnum'

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams
	const startDay = params.get('startDay')
	const endDay = params.get('endDay')

	if (!startDay || !endDay) {
		return NextResponse.json({ error: 'Invalid query' }, { status: 400 })
	}

	try {
		// Fetch bookings from the database
		const bookings = await prisma.booking.findMany({
			where: {
				AND: {
					booking_date: {
						gte: JSTToUTC(new Date(startDay as string)),
						lte: JSTToUTC(new Date(endDay as string)),
					},
					is_deleted: {
						not: true,
					},
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
			orderBy: [{ booking_date: 'asc' }, { booking_time: 'asc' }],
		})

		// Convert booking dates to JST
		const bookingsWithJST = bookings.map((booking) => ({
			...booking,
			booking_date: UTCToJST(new Date(booking.booking_date)),
		}))

		// Initialize the response structure with dates and time slots
		const result: Record<string, Record<number, any>> = {}

		// Create a map from startDay to endDay with empty slots for booking times (0-7)
		const currentDay = new Date(startDay)
		const lastDay = new Date(endDay)

		while (currentDay <= lastDay) {
			const formattedDay = currentDay.toISOString().split('T')[0] // Format as YYYY-MM-DD
			result[formattedDay] = {}
			for (let i = 0; i < TIME_LIST.length; i++) {
				result[formattedDay][i] = null // Initialize with null
			}
			currentDay.setDate(currentDay.getDate() + 1)
		}

		// Fill the 2D array with bookings
		bookingsWithJST.forEach((booking) => {
			const dayKey = booking.booking_date.toISOString().split('T')[0]
			if (result[dayKey]) {
				result[dayKey][booking.booking_time] = {
					id: booking.id,
					created_at: booking.created_at,
					booking_date: booking.booking_date,
					booking_time: booking.booking_time,
					name: booking.name,
					regist_name: booking.regist_name,
				}
			}
		})

		return NextResponse.json({ response: result }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch bookings' },
			{ status: 500 },
		)
	}
}
