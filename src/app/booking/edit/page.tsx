'use client'

import React from 'react'
import BookingEdit from '@/components/BookingEdit'
import { useSearchParams } from 'next/navigation'

const Page = () => {
	const queryParams = useSearchParams()
	const id = queryParams.get('id') ?? ''
	return <BookingEdit id={id}/>
}

export default Page
