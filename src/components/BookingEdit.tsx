'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Loading from '@/components/atom/Loading'
import BookingEditAuth from '@/components/BookingEditAuth'
import BookingEditForm from '@/components/BookingEditForm'

import { Typography, Container } from '@mui/material'

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
		<Container className="flex-col">
			<Typography variant="h4" className="text-center">
				予約編集
			</Typography>
			{isAuth ? (
				<BookingEditForm id={id} />
			) : (
				<BookingEditAuth id={id} isAuth={isAuth} handleSetAuth={setIsAuth} />
			)}
		</Container>
	)
}

export default BookingEdit
