'use client'

import { useState, useEffect, useRef } from 'react'
import {
	TextField,
	Typography,
	Container,
	Stack,
	Box,
	Alert,
	Button,
	MenuItem,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { TIME_LIST, Booking } from '@/lib/enum/BookingEnum'
import { format, set } from 'date-fns'
import { ja } from 'date-fns/locale'
import Popup, { PopupRef } from '@/components/atom/Popup'
import Loading from '@/components/atom/Loading'
import { SelectField } from '@/components/atom/SelectField'

const schema = yup.object().shape({
	booking_date: yup.date().required('予約日を入力してください'),
	booking_time: yup.number().required('予約時間を入力してください'),
	regist_name: yup.string().required('バンド名を入力してください'),
	name: yup.string().required('責任者名を入力してください'),
})

interface Props {
	id: string
}

type ResultType = {
	status: 'success' | 'error'
	title: string
	message: string
}

const BookingEditForm = (props: Props) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [bookingDetail, setBookingDetail] = useState<Booking>()
	const [editPopupOpen, setEditPopupOpen] = useState(false)
	const [deletePopupOpen, setDeletePopupOpen] = useState(false)
	const [resultPopupOpen, setResultPopupOpen] = useState(false)
	const [result, setResult] = useState<ResultType>()
	const editPopupRef = useRef<PopupRef>(undefined)
	const deletePopupRef = useRef<PopupRef>(undefined)
	const resultPopupRef = useRef<PopupRef>(undefined)

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	})

	const fetchBookingDetail = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`/api/booking/detail?id=${props.id}`)
			if (response.ok) {
				const data = await response.json()
				setBookingDetail(data.response)
				setValue('booking_date', new Date(data.response.booking_date))
				setValue('booking_time', data.response.booking_time)
				setValue('regist_name', data.response.regist_name)
				setValue('name', data.response.name)
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

	const onPutSubmit = async (data: any) => {
		setIsLoading(true)
	}

	const onDeleteSubmit = async () => {
		setIsLoading(true)
		setDeletePopupOpen(false)
		setEditPopupOpen(false)
		try {
			const response = await fetch(`/api/booking/delete?id=${props.id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (response.ok) {
				setResult({
					status: 'success',
					title: '予約削除',
					message: '予約の削除に成功しました',
				})
			} else {
				setResult({
					status: 'error',
					title: '予約削除',
					message: '予約の削除に失敗しました',
				})
			}
		} catch (error) {
			setResult({
				status: 'error',
				title: '予約削除',
				message: '予約の削除に失敗しました。エラーコード:' + error,
			})
		}
		setResultPopupOpen(true)
		setIsLoading(false)
	}

	useEffect(() => {
		fetchBookingDetail()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (isLoading) {
		return <Loading />
	}

	return (
		<>
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
						onClick={() => setEditPopupOpen(true)}
						disabled
					>
						編集(未実装)
					</Button>
					<Button
						variant="outlined"
						color="error"
						onClick={() => setDeletePopupOpen(true)}
					>
						削除
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
			<Popup
				ref={editPopupRef}
				title="予約編集"
				maxWidth="md"
				open={editPopupOpen}
				onClose={() => setEditPopupOpen(false)}
			>
				<Box className="p-4 flex flex-col justify-center gap-2">
					<form onSubmit={handleSubmit(onPutSubmit)}>
						<TextField
							label="予約日"
							type="date"
							{...register('booking_date')}
							fullWidth
							margin="normal"
							variant="outlined"
							required
						/>
						{errors.booking_date && (
							<Alert severity="error">{errors.booking_date.message}</Alert>
						)}
						<SelectField
							label="予約時間"
							{...register('booking_time')}
							fullWidth
							margin="normal"
							variant="outlined"
							required
							SelectProps={{
								children: TIME_LIST.map((time, index) => (
									<MenuItem key={index} value={index}>
										{time}
									</MenuItem>
								)),
							}}
						/>
						{errors.booking_time && (
							<Alert severity="error">{errors.booking_time.message}</Alert>
						)}
						<Typography variant="body1">
							バンド名: {bookingDetail?.regist_name}
						</Typography>
						<Typography variant="body1">
							責任者: {bookingDetail?.name}
						</Typography>
						<Stack spacing={2} direction="row" className="flex justify-center">
							<Button type="submit" variant="contained" color="success">
								編集
							</Button>
							<Button
								variant="outlined"
								color="inherit"
								onClick={() => setEditPopupOpen(false)}
							>
								キャンセル
							</Button>
						</Stack>
					</form>
				</Box>
			</Popup>
			<Popup
				ref={deletePopupRef}
				title="予約削除"
				maxWidth="sm"
				open={deletePopupOpen}
				onClose={() => setDeletePopupOpen(false)}
			>
				<Box className="p-4 flex flex-col justify-center gap-2">
					<Typography variant="body1" className="text-center">
						予約を削除しますか？
					</Typography>
					<form onSubmit={handleSubmit(onDeleteSubmit)}>
						<Stack spacing={2} direction="row" className="flex justify-center">
							<Button type="submit" variant="contained" color="error">
								削除
							</Button>
							<Button
								variant="outlined"
								color="inherit"
								onClick={() => setDeletePopupOpen(false)}
							>
								キャンセル
							</Button>
						</Stack>
					</form>
				</Box>
			</Popup>
			<Popup
				ref={resultPopupRef}
				title={result?.title as string}
				maxWidth="sm"
				open={resultPopupOpen}
				onClose={() => setResultPopupOpen(false)}
			>
				<Box className="p-4 flex flex-col justify-center gap-2">
					<Typography variant="body1" className="text-center">
						{result?.message}
					</Typography>
					<Stack spacing={2} direction="row" className="flex justify-center">
						<Button
							variant="outlined"
							color="inherit"
							onClick={() => {
								router.push('/')
								setResultPopupOpen(false)
							}}
						>
							ホームに戻る
						</Button>
					</Stack>
				</Box>
			</Popup>
		</>
	)
}

export default BookingEditForm
