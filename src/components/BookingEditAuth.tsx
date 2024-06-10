'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { TIME_LIST } from '@/lib/enum/BookingEnum'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import Loading from '@/components/atom/Loading'
import { Booking } from '@/lib/enum/BookingEnum'

import {
	TextField,
	Button,
	Typography,
	Container,
	Stack,
	Box,
	Alert,
} from '@mui/material'

const passschema = yup.object({
	password: yup.string().required('パスワードを入力してください'),
})

interface Props {
	id: string
	isAuth: boolean
	handleSetAuth: (isAuth: boolean) => boolean
}

const BookingEditAuth = (props: Props) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [bookingDetail, setBookingDetail] = useState<Booking>()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(passschema),
	})

	const fetchBookingDetail = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`/api/booking/detail?id=${props.id}`)
			if (response.ok) {
				const data = await response.json()
				setBookingDetail(data.response)
				setIsLoading(false)
			} else {
				setIsLoading(false)
				// alert('エラーが発生しました')
			}
		} catch (error) {
			setIsLoading(false)
			// alert('エラーが発生しました')
		}
	}

	const onSubmit = async (data: { password: string }) => {
		setIsLoading(true)
		try {
			const response = await fetch('/api/booking/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					booking_id: props.id,
					password: data.password,
				}),
			})
			if (response.ok) {
				props.handleSetAuth(true)
				router.push(`/booking/edit?id=${props.id}`)
			} else {
				setIsLoading(false)
				alert('パスワードが違います')
			}
		} catch (error) {
			setIsLoading(false)
			alert('エラーが発生しました')
		}
	}

	useEffect(() => {
		setIsLoading(false)
		props.handleSetAuth(false)
		fetchBookingDetail()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		props.handleSetAuth(false)
		fetchBookingDetail()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props])

	if (isLoading || !bookingDetail) {
		return <Loading />
	}

	return (
		<div className="p-4">
			<Typography variant="body1" className="text-center">
				予約を編集するためにパスワードを入力してください。
			</Typography>
			<Container>
				<Typography variant="h6" className="text-center">
					予約詳細
				</Typography>
				<Stack spacing={2} direction="column" className="flex justify-center">
					<Box>
						<Typography variant="body1">
							予約日:{' '}
							{format(new Date(bookingDetail.booking_date), 'yyyy/MM/dd', {
								locale: ja,
							})}
						</Typography>
					</Box>
					<Box>
						<Typography variant="body1">
							予約時間: {TIME_LIST[parseInt(bookingDetail.booking_time)]}
						</Typography>
					</Box>
					<Box>
						<Typography variant="body1">
							バンド名: {bookingDetail.regist_name}
						</Typography>
					</Box>
					<Box>
						<Typography variant="body1">
							責任者: {bookingDetail.name}
						</Typography>
					</Box>
				</Stack>
			</Container>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					label="パスワード"
					type="password"
					{...register('password')}
					fullWidth
					margin="normal"
					variant="outlined"
					required
				/>
				{errors.password && (
					<Alert severity="error">{errors.password.message}</Alert>
				)}
				<Button type="submit" variant="contained" color="success">
					ログイン
				</Button>
				<Button
					variant="outlined"
					color="inherit"
					onClick={() => router.push(`/booking?id=${props.id}`)}
				>
					予約詳細に戻る
				</Button>
			</form>
		</div>
	)
}

export default BookingEditAuth
