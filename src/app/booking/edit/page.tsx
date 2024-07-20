'use client'

import React, { Suspense } from 'react'
import BookingEdit from '@/components/booking/BookingEdit'
import Loading from '@/components/atoms/Loading'

const Page = () => {
	return (
		<Suspense fallback={<Loading />}>
			<BookingEdit />
		</Suspense>
	)
}

export default Page
