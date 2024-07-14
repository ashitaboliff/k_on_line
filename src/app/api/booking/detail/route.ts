import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma'

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams
	const id = params.get('id')

	if (!id) {
		return NextResponse.json({ error: 'Invalid query' }, { status: 400 })
	}

	try {
		const bookings = await prisma.booking.findFirst({
			where: {
				AND: {
					id: id,
					isDeleted: {
						not: true,
					},
				},
			},
			select: {
				id: true,
				createdAt: true,
				bookingDate: true,
				bookingTime: true,
				registName: true,
				name: true,
			},
		})
		return NextResponse.json({ response: bookings }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch bookings' },
			{ status: 500 },
		)
	}
}
