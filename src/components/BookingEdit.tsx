'use client'

import { useState, useEffect } from 'react'
import {
	TextField,
	Typography,
	Container,
	Stack,
	Box,
	Alert,
} from '@mui/material'
import Loading from '@/components/atom/Loading'
import BookingEditAuth from '@/components/BookingEditAuth'

const BookingEdit = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isAuth, setIsAuth] = useState<boolean>(false)

	useEffect(() => {
		setIsLoading(false)
	}, [])

	if (isLoading) {
		return <Loading />
	}

	return (
		<Container>
			<Stack spacing={2}>
				<Typography variant="h4">予約編集</Typography>
				{isAuth ? (
					<Box>
						<Typography>認証済み</Typography>
					</Box>
				) : (
					<Box>
						<Typography>未認証</Typography>
					</Box>
				)}
			</Stack>
		</Container>
	)
}

export default BookingEdit
