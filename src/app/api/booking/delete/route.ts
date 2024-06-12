import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma'
import { v4 } from 'uuid'
import { JSTToUTC, UTCToJST } from '@/lib/CommonFunction'
import bcryptjs from 'bcryptjs'

export async function POST(request: NextRequest) {
	const params = request.nextUrl.searchParams
	const id = params.get('id')

	if (!id) {
		return NextResponse.json({ error: 'Invalid query' }, { status: 400 })
	}

	try {
		const atBooking = await prisma.booking.findUnique({
			where: {
				id: id,
				is_deleted: {
					not: true,
				},
			},
		})
		if (!atBooking) {
			return NextResponse.json(
				{ error: '指定したIDの予約はありません。' },
				{ status: 404 },
			)
		}
		await prisma.booking.update({
			where: {
				id: id,
			},
			data: {
				updated_at: new Date(),
				is_deleted: true,
			},
		})
		return NextResponse.json({ status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Failed to fetch bookings' },
			{ status: 500 },
		)
	}
}
