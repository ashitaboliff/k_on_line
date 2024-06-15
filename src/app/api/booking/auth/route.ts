import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma'
import bcryptjs from 'bcryptjs'

export async function POST(req: NextRequest) {
	const body = (await req.json()) as unknown as {
		booking_id: string
		password: string
	}
	if (!body.booking_id) {
		return NextResponse.json({ error: 'Invalid query' }, { status: 400 })
	}

	try {
		const bookings = await prisma.booking.findFirst({
			where: {
				id: body.booking_id,
				is_deleted: {
					not: true,
				},
			},
			select: {
				password: true,
			},
		})
		if (!bookings) {
			return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
		}
		const match = bcryptjs.compareSync(body.password, bookings.password)
		if (!match) {
			return NextResponse.json({ error: 'Invalid password' }, { status: 403 })
		}
		return NextResponse.json({ response: 'OK' }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to fetch bookings' },
			{ status: 500 },
		)
	}
}
