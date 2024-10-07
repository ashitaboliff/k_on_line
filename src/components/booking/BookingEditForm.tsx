'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TIME_LIST } from '@/lib/enum/BookingEnum'
import { Booking } from '@/types/BookingTypes'
import Loading from '@/components/atoms/Loading'
import InfoMessage from '@/components/atoms/InfoMessage'
import BookingDetailBox from '@/components/molecules/BookingDetailBox'
import Popup, { PopupRef } from '@/components/molecules/Popup'
import { SelectField } from '@/components/molecules/SelectField'
import BookingDetailNotFound from '@/components/booking/BookingDetailNotFound'

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
			}
		} catch (error) {
			// エラー処理
		}
		setIsLoading(false)
	}

	const onPutSubmit = async (data: any) => {
		setIsLoading(true)
		// 予約編集処理
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
	if (!bookingDetail) {
		return <BookingDetailNotFound />
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center p-4">
				<BookingDetailBox
					booking_date={bookingDetail.booking_date}
					booking_time={bookingDetail.booking_time}
					regist_name={bookingDetail.regist_name}
					name={bookingDetail.name}
				/>
				<div className="flex justify-center gap-2 mt-4">
					<button
						className="btn btn-success"
						onClick={() => setEditPopupOpen(true)}
						disabled
					>
						編集(未実装)
					</button>
					<button
						className="btn btn-error"
						onClick={() => setDeletePopupOpen(true)}
					>
						削除
					</button>
					<button
						className="btn btn-outline"
						onClick={() => router.push('/booking')}
					>
						ホームに戻る
					</button>
				</div>
			</div>

			{/* <Popup
				ref={editPopupRef}
				title="予約編集"
				maxWidth="md"
				open={editPopupOpen}
				onClose={() => setEditPopupOpen(false)}
			>
				<div className="p-4">
					<form onSubmit={handleSubmit(onPutSubmit)} className="space-y-4">
						<div className="form-control">
							<label className="label">予約日</label>
							<input
								type="date"
								{...register('booking_date')}
								className="input input-bordered w-full"
								required
							/>
							{errors.booking_date && (
								<p className="text-red-500 text-sm mt-1">
									{errors.booking_date.message}
								</p>
							)}
						</div>

						<div className="form-control">
							<SelectField
								label="予約時間"
								{...register('booking_time')}
								required
							>
								{TIME_LIST.map((time, index) => (
									<option key={index} value={index}>
										{time}
									</option>
								))}
							</SelectField>
							{errors.booking_time && (
								<p className="text-red-500 text-sm mt-1">
									{errors.booking_time.message}
								</p>
							)}
						</div>

						<div className="flex justify-center gap-4 mt-4">
							<button type="submit" className="btn btn-success">
								編集
							</button>
							<button
								type="button"
								className="btn btn-outline"
								onClick={() => setEditPopupOpen(false)}
							>
								キャンセル
							</button>
						</div>
					</form>
				</div>
			</Popup> */}

			<Popup
				ref={deletePopupRef}
				title="予約削除"
				maxWidth="sm"
				open={deletePopupOpen}
				onClose={() => setDeletePopupOpen(false)}
			>
				<div className="p-4">
					<p className="text-center">予約を削除しますか？</p>
					<div className="flex justify-center gap-4 mt-4">
						<button className="btn btn-error" onClick={onDeleteSubmit}>
							削除
						</button>
						<button
							className="btn btn-outline"
							onClick={() => setDeletePopupOpen(false)}
						>
							キャンセル
						</button>
					</div>
				</div>
			</Popup>

			<Popup
				ref={resultPopupRef}
				title={result?.title as string}
				maxWidth="sm"
				open={resultPopupOpen}
				onClose={() => setResultPopupOpen(false)}
			>
				<div className="p-4 text-center">
					<InfoMessage
						message={result?.message as string}
						messageType={result?.status === 'success' ? 'success' : 'error'}
						IconColor="bg-white"
					/>
					<div className="flex justify-center gap-4 mt-4">
						<button
							className="btn btn-outline"
							onClick={() => {
								router.push('/booking')
								setResultPopupOpen(false)
							}}
						>
							ホームに戻る
						</button>
					</div>
				</div>
			</Popup>
		</>
	)
}

export default BookingEditForm
