'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const BookingLogs = dynamic(() => import('@/components/booking/BookingLogs'), {
	ssr: false,
})

const BookingLog = () => {
	return <BookingLogs />
}

export default BookingLog
