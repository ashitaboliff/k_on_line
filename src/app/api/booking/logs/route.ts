import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma'
import { UTCToJST } from '@/lib/CommonFunction'

export async function GET(req: NextRequest) {
	try {
		const bookings = await prisma.booking.findMany({
			select: {
				id: true,
				created_at: true,
				updated_at: true,
				booking_date: true,
				booking_time: true,
				regist_name: true,
				name: true,
				is_deleted: true,
			},
			orderBy: { created_at: 'desc' },
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
