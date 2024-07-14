import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma'
import { UTCToJST } from '@/lib/CommonFunction'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function GET(req: NextRequest) {
	try {
		const bookings = await prisma.booking.findMany({
			select: {
				id: true,
				createdAt: true,
				updatedAt: true,
				bookingDate: true,
				bookingTime: true,
				registName: true,
				name: true,
				is_deleted: true,
			},
			orderBy: { createdAt: 'desc' },
		})
		const bookingsWithJST = bookings.map((booking) => ({
			...booking,
			booking_date: UTCToJST(new Date(booking.bookingDate)),
		}))
		return NextResponse.json({ response: bookingsWithJST }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch bookings' },
			{ status: 500 },
		)
	}
}
