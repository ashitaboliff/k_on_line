'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import Loading from '@/components/atoms/Loading'
import BookingDetailBox from '@/components/molecules/BookingDetailBox'
import Popup, { PopupRef } from '@/components/molecules/Popup'
import { Booking } from '@/lib/enum/BookingEnum'

import {
	Button,
	Typography,
	Container,
	Stack,
	Box,
	Alert,
	FormControl,
	InputLabel,
	IconButton,
	InputAdornment,
	OutlinedInput,
} from '@mui/material'
import { MdVisibilityOff, MdVisibility } from 'react-icons/md'

const passschema = yup.object({
	password: yup.string().required('パスワードを入力してください'),
})

interface Props {
	id: string
	isAuth: boolean
	handleSetAuth: (isAuth: boolean) => void
}

const BookingEditAuth = (props: Props) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [bookingDetail, setBookingDetail] = useState<Booking>()
	const [isErrorMessages, setIsErrorMessages] = useState<string | undefined>(
		undefined,
	)
	const [errorPopupOpen, setErrorPopupOpen] = useState<boolean>(false)
	const errorPopupRef = useRef<PopupRef>(undefined)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(passschema),
	})
	const handleClickShowPassword = () => setShowPassword((show) => !show)
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault()
	}

	const fetchBookingDetail = async () => {
		setIsLoading(true)
		setIsErrorMessages(undefined)
		setErrorPopupOpen(false)
		try {
			const response = await fetch(`/api/booking/detail?id=${props.id}`)
			if (response.ok) {
				const data = await response.json()
				setBookingDetail(data.response)
			} else {
				setErrorPopupOpen(true)
				setIsErrorMessages('予約情報が見つかりませんでした')
			}
		} catch (error) {
			setErrorPopupOpen(true)
			setIsErrorMessages('エラーが発生しました')
		}
		setIsLoading(false)
	}

	const onSubmit = async (data: { password: string }) => {
		setIsLoading(true)
		setIsErrorMessages(undefined)
		setErrorPopupOpen(false)
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
				setErrorPopupOpen(true)
				setIsErrorMessages('パスワードが違います')
			}
		} catch (error) {
			setErrorPopupOpen(true)
			setIsErrorMessages('エラーが発生しました')
		}
		setIsLoading(false)
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

	if (isLoading) {
		return <Loading />
	}

	if (!bookingDetail) {
		return (
			<Box className="p-4 flex flex-col items-center justify-center">
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
		<>
			<Typography variant="body1" className="text-center">
				予約を編集するためにパスワードを入力してください。
			</Typography>
			<Container className="flex justify-center flex-col">
				<Typography variant="h6" className="text-center">
					予約詳細
				</Typography>
				<Stack spacing={2} direction="row" className="flex justify-center">
					<BookingDetailBox
						booking_date={bookingDetail.booking_date}
						booking_time={bookingDetail.booking_time}
						regist_name={bookingDetail.regist_name}
						name={bookingDetail.name}
					/>
				</Stack>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col items-center"
				>
					<FormControl variant="outlined" className="w-2/5 m-2">
						<InputLabel htmlFor="password">パスワード</InputLabel>
						<OutlinedInput
							id="password"
							label="パスワード"
							type={showPassword ? 'text' : 'password'}
							{...register('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <MdVisibilityOff /> : <MdVisibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					{errors.password && (
						<Alert severity="error">{errors.password.message}</Alert>
					)}
					<Stack
						spacing={2}
						direction="row"
						className="flex justify-center m-2"
					>
						<Button type="submit" variant="contained" color="success">
							ログイン
						</Button>
						<Button
							variant="outlined"
							color="inherit"
							onClick={() => router.push(`/booking/detail?id=${props.id}`)}
						>
							予約詳細に戻る
						</Button>
					</Stack>
				</form>
			</Container>
			<Popup
				ref={errorPopupRef}
				title="エラー"
				maxWidth="sm"
				open={errorPopupOpen}
				onClose={() => setErrorPopupOpen(false)}
			>
				<Box className="p-4 flex flex-col justify-center gap-2">
					<Alert severity="error">{isErrorMessages}</Alert>
					<Button
						variant="outlined"
						color="inherit"
						onClick={() => setErrorPopupOpen(false)}
					>
						閉じる
					</Button>
				</Box>
			</Popup>
		</>
	)
}

export default BookingEditAuth
