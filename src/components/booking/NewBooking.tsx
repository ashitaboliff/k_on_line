import React, { useEffect, useState, useRef, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams, useRouter } from 'next/navigation'
import { parseDateString } from '@/lib/CommonFunction'
import { TIME_LIST } from '@/lib/enum/BookingEnum'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import Loading from '@/components/atoms/Loading'
import TextInputField from '@/components/atoms/TextInputField'
import InfoMessage from '@/components/atoms/InfoMessage'
import Popup, { PopupRef } from '@/components/molecules/Popup'
import PasswordInputField from '@/components/molecules/PasswordInputField'

type PopupChildren = {
	title: string
	children: ReactNode
}

const schema = yup.object().shape({
	regist_name: yup.string().required('バンド名を入力してください'),
	name: yup.string().required('責任者名を入力してください'),
	password: yup.string().required('パスワードを入力してください'),
})

const NewBooking = () => {
	const router = useRouter()
	const [isState, setIsState] = useState<'loading' | 'input' | 'submit'>(
		'loading',
	)
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [PopupChildren, setPopupChildren] = useState<PopupChildren | null>(null)
	const [noticePopupOpen, setNoticePopupOpen] = useState(false)
	const noticePopupRef = useRef<PopupRef>(undefined)

	const handleClickShowPassword = () => setShowPassword((show) => !show)
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault()
	}

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
		setNoticePopupOpen(false)
	}, [])

	useEffect(() => {
		if (isState === 'submit') {
			setNoticePopupOpen(true)
		} else {
			setNoticePopupOpen(false)
		}
	}, [isState])

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
				setPopupChildren({
					title: '予約完了',
					children: (
						<div className="text-center">
							<p>以下の内容で予約が完了しました。</p>
							<p>
								日付:{' '}
								{format(parseDateString(bookingDate), 'yyyy/MM/dd(E)', {
									locale: ja,
								})}
							</p>
							<p>時間: {TIME_LIST[Number(bookingTime)]}</p>
							<p>バンド名: {watch('regist_name')}</p>
							<p>責任者: {watch('name')}</p>
							<button
								type="button"
								className="btn btn-outline mt-4"
								onClick={() => {
									router.push('/booking')
									setNoticePopupOpen(false)
								}}
							>
								カレンダーに戻る
							</button>
						</div>
					),
				})
				setIsState('submit')
			} else {
				const errorMsg =
					response.status === 400
						? '予約に失敗しました。多分予約が重複してます。'
						: response.status === 302
							? '予約に失敗しました。多分予約可能時間の範囲外です。'
							: '予約に失敗しました。なんのエラーかわからんので出ないことを祈ります。'
				setPopupChildren({
					title: 'エラー',
					children: (
						<div className="text-center">
							<InfoMessage
								messageType="error"
								IconColor="bg-white"
								message={errorMsg}
							/>
							<button
								type="button"
								className="btn btn-outline mt-4"
								onClick={() => {
									setNoticePopupOpen(false)
								}}
							>
								閉じる
							</button>
						</div>
					),
				})
				setIsState('submit')
			}
		} catch (error) {
			setPopupChildren({
				title: 'エラー',
				children: (
					<div className="text-center">
						<InfoMessage
							messageType="error"
							IconColor="bg-white"
							message={
								'予約に失敗しました。何度もこのエラーが出る場合、管理者に連絡してください。'
							}
						/>
						<button
							type="button"
							className="btn btn-outline mt-4"
							onClick={() => {
								setNoticePopupOpen(false)
							}}
						>
							閉じる
						</button>
					</div>
				),
			})
		}
	}

	if (isState === 'loading') {
		return <Loading />
	}

	return (
		<div className="p-8">
			<div className="text-center mb-8">
				<h2 className="text-2xl font-bold">新規予約</h2>
				<p className="mt-4">
					日付:{' '}
					{format(parseDateString(bookingDate), 'yyyy/MM/dd(E)', {
						locale: ja,
					})}
				</p>
				<p>時間: {TIME_LIST[Number(bookingTime)]}</p>
			</div>

			<div className="max-w-md mx-auto">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
					<TextInputField
						register={register('regist_name')}
						placeholder="バンド名"
						type="text"
					/>
					{errors.regist_name && (
						<div className="flex justify-center">
							<InfoMessage
								messageType="error"
								IconColor="bg-white"
								message={errors.regist_name.message}
							/>
						</div>
					)}
					<TextInputField
						register={register('name')}
						placeholder="責任者名"
						type="text"
					/>
					{errors.name && (
						<div className="flex justify-center">
							<InfoMessage
								messageType="error"
								IconColor="bg-white"
								message={errors.name.message}
							/>
						</div>
					)}
					<div className="form-control">
						<PasswordInputField
							register={register('password')}
							showPassword={showPassword}
							handleClickShowPassword={handleClickShowPassword}
							handleMouseDownPassword={handleMouseDownPassword}
						/>
					</div>
					{errors.password && (
						<div className="flex justify-center">
							<InfoMessage
								messageType="error"
								IconColor="bg-white"
								message={errors.password.message}
							/>
						</div>
					)}

					<div className="flex justify-center space-x-4">
						<button type="submit" className="btn btn-primary">
							予約する
						</button>
						<button
							type="button"
							className="btn btn-outline"
							onClick={() => router.push('/booking')}
						>
							カレンダーに戻る
						</button>
					</div>
				</form>
			</div>

			{/* Completion Popup */}
			<Popup
				ref={noticePopupRef}
				title={PopupChildren?.title as string}
				maxWidth="md"
				open={noticePopupOpen}
				onClose={() => setNoticePopupOpen(false)}
			>
				{PopupChildren?.children}
			</Popup>
		</div>
	)
}

export default NewBooking
