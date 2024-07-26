'use server'

import React from 'react'
import MainPage from '@/components/booking/BookingMainPage'
import UpdateMessage from '@/components/molecules/UpdateMessage'

const Page = () => {
	return (
		<>
			<UpdateMessage />
			<MainPage />
		</>
	)
}

export default Page
