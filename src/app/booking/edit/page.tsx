'use client'

import React, { Suspense } from 'react'
import BookingEdit from '@/components/BookingEdit'
import { useSearchParams } from 'next/navigation'

const Page = () => {
	const queryParams = useSearchParams()
	const id = queryParams.get('id') ?? ''
	return (
		<Suspense>
			<BookingEdit id={id} />
		</Suspense>
	)
}

export default Page
