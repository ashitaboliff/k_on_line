import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma'
import { UTCToJST, JSTToUTC } from '@/lib/CommonFunction'

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams
	const startDay = params.get('startDay')
	const endDay = params.get('endDay')

	if (!startDay || !endDay) {
		return NextResponse.json({ error: 'Invalid query' }, { status: 400 })
	}

	try {
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
		const bookingsWithJST = bookings.map((booking) => ({
			...booking,
			booking_date: UTCToJST(new Date(booking.booking_date)),
		}))
		return NextResponse.json({ response: bookingsWithJST }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch bookings' },
			{ status: 500 },
		)
	}
}
