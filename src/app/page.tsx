'use client'

import { Link } from '@mui/material'
import React from 'react'
import CalendarTable from '@/components/molecules/BookingCalendar'

const Page = () => {
	return (
		<div>
			<Link href="/booking">予約ページ</Link>
			<CalendarTable />
		</div>
	)
}

export default Page
