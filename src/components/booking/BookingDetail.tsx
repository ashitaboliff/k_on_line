import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Alert, Box, Button, Stack, Typography } from '@mui/material'
import { Booking } from '@/types/BookingTypes'
import Loading from '@/components/atoms/Loading'
import BookingDetailBox from '@/components/molecules/BookingDetailBox'

const BookingDetail = () => {
	const id = useSearchParams().get('id')
	const [bookingDetail, setBookingDetail] = useState<Booking | undefined>(
		undefined,
	)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const router = useRouter()

	const fetchBookingDetail = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`/api/booking/detail?id=${id}`)
			if (response.ok) {
				const data = await response.json()
				setBookingDetail(data.response)
				setIsLoading(false)
			} else {
				// console.error('Failed to fetch booking detail')
				setIsLoading(false)
			}
		} catch (error) {
			// console.error('Error fetching booking detail:', error)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchBookingDetail()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	if (isLoading) {
		return <Loading />
	}

	if (!bookingDetail) {
		return (
			<Box className="p-4 flex flex-col items-center justify-center">
				<Typography variant="h4" className="text-center">
					予約詳細
				</Typography>
				<Box className="p-4 flex flex-col justify-center gap-2">
					<Alert severity="error">エラー</Alert>
					<Typography variant="body1">
						予約情報が見つかりませんでした。
						<br />
						ホームに戻ってもう一度試してください。
					</Typography>
					<Button
						variant="outlined"
						color="inherit"
						onClick={() => router.push('/booking')}
					>
						ホームに戻る
					</Button>
				</Box>
			</Box>
		)
	}

	return (
		<Box className="p-4 flex flex-col items-center justify-center">
			<Typography variant="h6" className="text-center">
				予約詳細
			</Typography>
			<BookingDetailBox
				booking_date={bookingDetail.booking_date}
				booking_time={bookingDetail.booking_time}
				regist_name={bookingDetail.regist_name}
				name={bookingDetail.name}
			/>
			<Stack spacing={2} direction="row" className="flex justify-center">
				<Button
					variant="contained"
					color="success"
					onClick={() => router.push(`/booking/edit?id=${bookingDetail?.id}`)}
				>
					編集
				</Button>
				<Button
					variant="outlined"
					color="inherit"
					onClick={() => router.push('/booking')}
				>
					ホームに戻る
				</Button>
			</Stack>
		</Box>
	)
}

export default BookingDetail
