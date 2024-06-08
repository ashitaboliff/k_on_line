import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Alert, Box, Button, Stack, Typography } from '@mui/material'
import { Booking, TIME_LIST } from '@/lib/enum/BookingEnum'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import Loading from '@/components/atom/Loading'

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
				<Box className="p-4 w-1/3 flex flex-col justify-center gap-2">
					<Alert severity="error">エラー</Alert>
					<Typography variant="body1">
						予約情報が見つかりませんでした。
						<br />
						ホームに戻ってもう一度試してください。
					</Typography>
					<Button
						variant="outlined"
						color="inherit"
						onClick={() => router.push('/')}
					>
						ホームに戻る
					</Button>
				</Box>
			</Box>
		)
	}

	return (
		<Box className="p-4 flex flex-col items-center justify-center">
			<Typography variant="h4" className="text-center">
				予約詳細
			</Typography>
			<Box className="p-4 w-1/4 flex flex-col justify-center gap-2">
				<Typography variant="body1">
					日時:{' '}
					{format(bookingDetail?.booking_date as Date, 'yyyy年MM月dd日(E)', {
						locale: ja,
					})}
				</Typography>
				<Typography variant="body1">
					時間: {TIME_LIST[Number(bookingDetail?.booking_time)]}
				</Typography>
				<Typography variant="body1">
					バンド名: {bookingDetail?.regist_name}
				</Typography>
				<Typography variant="body1">責任者: {bookingDetail?.name}</Typography>
			</Box>
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
					onClick={() => router.push('/')}
				>
					ホームに戻る
				</Button>
			</Stack>
		</Box>
	)
}

export default BookingDetail
