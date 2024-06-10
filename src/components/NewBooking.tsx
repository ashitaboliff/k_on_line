import React, { useEffect, useState, useRef, ReactNode } from 'react'
import {
	TextField,
	Button,
	Typography,
	Container,
	Stack,
	Box,
} from '@mui/material'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams, useRouter } from 'next/navigation'
import { parseDateString } from '@/lib/CommonFunction'
import { TIME_LIST } from '@/lib/enum/BookingEnum'
import { format, set } from 'date-fns'
import { ja } from 'date-fns/locale'
import Popup, { PopupRef } from '@/components/atom/Popup'
import Loading from '@/components/atom/Loading'

const schema = yup.object().shape({
	regist_name: yup.string().required('バンド名を入力してください'),
	name: yup.string().required('責任者名を入力してください'),
	password: yup.string().required('パスワードを入力してください'),
})

const NewBooking = () => {
	const router = useRouter()
	const [isState, setIsState] = useState<'loading' | 'input' | 'complate'>(
		'loading',
	)
	const [error, setError] = useState<ReactNode | null>(null)
	const [complatePopupOpen, setComplatePopupOpen] = useState(false)
	const [errorPopupOpen, setErrorPopupOpen] = useState(false)
	const complatePopupRef = useRef<PopupRef>(undefined)
	const errorPopupRef = useRef<PopupRef>(undefined)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	})

	const queryParams = useSearchParams()
	const bookingDate =
		queryParams.get('booking_date') ?? new Date().toISOString().split('T')[0]
	const bookingTime = queryParams.get('booking_time') ?? '0'

	useEffect(() => {
		setIsState('input')
		setComplatePopupOpen(false)
	}, [])

	useEffect(() => {
		if (isState === 'complate') {
			setComplatePopupOpen(true)
		} else {
			setComplatePopupOpen(false)
		}
	}, [isState])

	useEffect(() => {
		if (error) {
			setErrorPopupOpen(true)
		} else {
			setErrorPopupOpen(false)
		}
	}, [error])

	const onSubmit = async (data: any) => {
		const reservationData = {
			booking_date: parseDateString(bookingDate),
			booking_time: Number(bookingTime),
			regist_name: data.regist_name,
			name: data.name,
			password: data.password,
		}

		try {
			const response = await fetch('/api/booking/new', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(reservationData),
			})

			if (response.ok) {
				setError(null)
				setIsState('complate')
			} else {
				if (response.status === 400) {
					setError(
						<Alert severity="error">
							予約に失敗しました。多分予約が重複してます。エラーコード:
							{response.status}
						</Alert>,
					)
				} else if (response.status === 302) {
					setError(
						<Alert severity="error">
							予約に失敗しました。多分予約可能時間の範囲外です。エラーコード:
							{response.status}
						</Alert>,
					)
				} else {
					setError(
						<Alert severity="error">
							予約に失敗しました。なんのエラーかわからんので出ないことを祈ります。エラーコード:
							{response.status}
						</Alert>,
					)
				}

				setIsState('input')
			}
		} catch (error) {
			setError(
				<Alert severity="error">
					予約に失敗しました。何度もこのエラーが出る場合はわたべに連絡してください。
				</Alert>,
			)
		}
	}

	if (isState === 'loading') {
		return <Loading />
	}

	return (
		<div>
			<Container maxWidth="md">
				<Typography variant="h6" className="text-center mb-4">
					新規予約
				</Typography>
				<Typography variant="body1" className="text-center mb-4">
					日付:{' '}
					{format(parseDateString(bookingDate), 'yyyy/MM/dd(E)', {
						locale: ja,
					})}
				</Typography>
				<Typography variant="body1" className="text-center mb-4">
					時間: {TIME_LIST[Number(bookingTime)]}
				</Typography>
			</Container>
			<Container maxWidth="md">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Container maxWidth="sm">
						<TextField
							{...register('regist_name')}
							label="バンド名"
							variant="outlined"
							fullWidth
							margin="normal"
							required
						/>
						{errors.regist_name && (
							<Alert severity="error">{errors.regist_name.message}</Alert>
						)}
						<TextField
							{...register('name')}
							label="責任者"
							variant="outlined"
							fullWidth
							margin="normal"
							required
						/>
						{errors.name && (
							<Alert severity="error">{errors.name.message}</Alert>
						)}
						<TextField
							{...register('password')}
							label="パスワード"
							type="password"
							variant="outlined"
							fullWidth
							margin="normal"
							required
						/>
						{errors.password && (
							<Alert severity="error">{errors.password.message}</Alert>
						)}
					</Container>
					<Stack spacing={2} direction="row" className="flex justify-center">
						<Button type="submit" variant="contained" color="success">
							予約する
						</Button>
						<Button
							type="button"
							variant="outlined"
							color="inherit"
							onClick={() => router.push('/')}
						>
							カレンダーに戻る
						</Button>
					</Stack>
				</form>
			</Container>
			<Popup
				ref={complatePopupRef}
				title="予約完了"
				maxWidth="md"
				open={complatePopupOpen}
				onClose={() => setComplatePopupOpen(false)}
			>
				<Typography variant="h6" className="text-center mb-4">
					以下の内容で予約が完了しました。
				</Typography>
				<Box className="text-center">
					<Typography variant="body1">
						日付:{' '}
						{format(parseDateString(bookingDate), 'yyyy/MM/dd(E)', {
							locale: ja,
						})}
					</Typography>
					<Typography variant="body1">
						時間: {TIME_LIST[Number(bookingTime)]}
					</Typography>
					<Typography variant="body1">
						バンド名: {watch('regist_name')}
					</Typography>
					<Typography variant="body1">責任者: {watch('name')}</Typography>
					<Button
						type="button"
						variant="outlined"
						color="inherit"
						onClick={() => {
							router.push('/')
							setComplatePopupOpen(false)
						}}
					>
						カレンダーに戻る
					</Button>
				</Box>
			</Popup>
			<Popup
				ref={errorPopupRef}
				title="エラー"
				maxWidth="md"
				open={errorPopupOpen}
				onClose={() => {
					setErrorPopupOpen(false)
					setError(null)
				}}
			>
				<Box className="text-center">
					<Typography variant="body1">{error}</Typography>
					<Button
						type="button"
						variant="outlined"
						color="inherit"
						onClick={() => {
							setErrorPopupOpen(false)
							setError(null)
						}}
					>
						閉じる
					</Button>
				</Box>
			</Popup>
		</div>
	)
}

export default NewBooking
