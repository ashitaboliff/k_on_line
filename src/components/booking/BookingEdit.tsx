'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Loading from '@/components/atoms/Loading'
import BookingEditAuth from '@/components/booking/BookingEditAuth'
import BookingEditForm from '@/components/booking/BookingEditForm'

const BookingEdit = () => {
	const id = useSearchParams().get('id') ?? ''
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isAuth, setIsAuth] = useState<boolean>(false)

	useEffect(() => {
		setIsLoading(false)
	}, [])

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className="flex-col">
			<div className="text-xl text-center">予約編集</div>
			{isAuth ? (
				<BookingEditForm id={id} />
			) : (
				<BookingEditAuth id={id} isAuth={isAuth} handleSetAuth={setIsAuth} />
			)}
		</div>
	)
}

export default BookingEdit
