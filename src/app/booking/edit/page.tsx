'use client'

import React, { Suspense } from 'react'
import BookingEdit from '@/components/BookingEdit'
import Loading from '@/components/atom/Loading'

const Page = () => {
	return (
		<Suspense fallback={<Loading />}>
			<BookingEdit />
		</Suspense>
	)
}

export default Page
