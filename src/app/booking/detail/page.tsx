'use client'

import React, { Suspense } from 'react'
import BookingDetail from '@/components/booking/BookingDetail'
import Loading from '@/components/atoms/Loading'

const Page = () => {
	return (
		<Suspense fallback={<Loading />}>
			<BookingDetail />
		</Suspense>
	)
}

export default Page
