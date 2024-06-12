'use client'

import React, { Suspense } from 'react'
import BookingDetail from '@/components/BookingDetail'
import Loading from '@/components/atom/Loading'

const Page = () => {
	return (
		<Suspense fallback={<Loading/>}>
			<BookingDetail />
		</Suspense>
	)
}

export default Page
