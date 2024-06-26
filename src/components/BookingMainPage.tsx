'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { TIME_LIST, Booking } from '@/lib/enum/BookingEnum'
import Popup, { PopupRef } from '@/components/atom/Popup'
import { BookingTableBox } from '@/components/atom/BookingTableBox'
import Loading from '@/components/atom/Loading'

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Stack,
	TableFooter,
	Typography,
} from '@mui/material'
import { PiCircle } from 'react-icons/pi'
import { HiMiniXMark } from 'react-icons/hi2'

const ArrayDayList = Array.from({ length: 15 }, (_, i) => i - 1)

const MainPage = () => {
	const today = new Date()
	const [dateRange, setDateRange] = useState<Date[]>([
		new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + ArrayDayList[0],
		),
		new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + ArrayDayList[14],
		),
	])
	const [dateRangeString, setDateRangeString] = useState<string[]>(['', ''])
	const [dateList, setDateList] = useState<Date[]>([])
	const [bookings, setBookings] = useState<Booking[]>([])
	// 第一引数を日付、第二引数を時間として予約情報を格納する二次元配列
	const [bookingData, setBookingData] = useState<Booking[][]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
	const ReadMePopupRef = useRef<PopupRef>(undefined)

	const generateDateList = (start: Date, end: Date) => {
		const dates = []
		let currentDate = new Date(start)
		while (currentDate <= end) {
			dates.push(new Date(currentDate))
			currentDate.setDate(currentDate.getDate() + 1)
		}
		return dates
	}

	const getBooking = async () => {
		setIsLoading(true)
		const startDay = format(dateRange[0], 'yyyy-MM-dd', { locale: ja })
		const endDay = format(dateRange[1], 'yyyy-MM-dd', { locale: ja })
		try {
			const response = await fetch(
				`/api/booking?startDay=${startDay}&endDay=${endDay}`,
			)
			if (response.ok) {
				const data = await response.json()
				setBookings(data.response)
			} else {
				alert('予約情報の取得に失敗しました。ページを再読み込みしてください。直らない場合はわたべまで')
			}
		} catch (error) {
			alert('予約情報の取得に失敗しました。ページを再読み込みしてください。直らない場合はわたべまで')
		} finally {
			setIsLoading(false)
		}
	}

	const getUpdate = async () => {
		const today = new Date()
		const startDate = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + ArrayDayList[0],
		)
		const endDate = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + ArrayDayList[14],
		)
		setDateRange([startDate, endDate])
		setDateRangeString([
			format(startDate, 'yyyy-MM-dd', { locale: ja }),
			format(endDate, 'yyyy-MM-dd', { locale: ja }),
		])
		getBooking()
	}

	useEffect(() => {
		getUpdate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (dateRangeString[0] !== '' && dateRangeString[1] !== '') {
			getBooking()
			setDateList(generateDateList(dateRange[0], dateRange[1]))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dateRangeString, dateRange])

	useEffect(() => {
		const initialBookingList = Array.from({ length: dateList.length }, () =>
			Array(TIME_LIST.length).fill(null),
		)

		bookings.forEach((booking) => {
			const bookingDate = new Date(booking.booking_date)
			const dateIndex = dateList.findIndex(
				(date) =>
					date.getFullYear() === bookingDate.getFullYear() &&
					date.getMonth() === bookingDate.getMonth() &&
					date.getDate() === bookingDate.getDate(),
			)
			const timeIndex = Number(booking.booking_time)

			if (dateIndex !== -1 && timeIndex !== -1) {
				initialBookingList[dateIndex][timeIndex] = booking
			}
		})

		setBookingData(initialBookingList)
	}, [dateList, bookings])

	if (isLoading) {
		return <Loading />
	}

	return (
		<div>
			<Stack spacing={2} direction="row" className="flex justify-center m-2">
				<Button variant="contained" color="success" onClick={() => getUpdate()}>
					カレンダーを更新
				</Button>
				<Button
					variant="outlined"
					color="inherit"
					onClick={() => setIsPopupOpen(true)}
				>
					使い方の表示
				</Button>
			</Stack>
			<Stack spacing={8} direction="row" className="flex justify-center">
				<Image
					src="/animal_music_band.png"
					alt="logo"
					width={150}
					height={120}
				/>
				<Image src="/animal_dance.png" alt="logo" width={150} height={120} />
			</Stack>
			<Stack spacing={2} direction="row" className="flex justify-center">
				{isLoading ? (
					<Loading />
				) : (
					<TableContainer component={Paper} className="m-10 w-11/12">
					{' '}
					{/* カレンダー全体 */}
					<Table>
						<TableHead>
							{' '}
							{/* 日付 */}
							<TableRow>
								<TableCell
									className="border border-slate-600 p-2"
									padding="none"
								></TableCell>
								{dateList.map((day, index) => {
									const isThursday = day.getDay() === 4
									return (
										<TableCell
											key={index}
											className="border border-slate-600 p-2 center w-16"
											padding="none"
										>
											<span>{format(day, 'M月d日(E)', { locale: ja })}</span>
										</TableCell>
									)
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{TIME_LIST.map((time, timeIndex) => (
								<TableRow
									key={timeIndex}
									sx={{
										'&:nth-of-type(odd)': {
											backgroundColor: '#dcdcdc',
										},
									}}
								>
									<TableCell
										className="border border-slate-600 p-2 w-10"
										padding="none"
									>
										<span>{time}</span>
									</TableCell>
									{dateList.map((day, dateIndex) => {
										const isThursday = day.getDay() === 4 && timeIndex > 4
										const isBookingAvailable = bookingData[dateIndex][timeIndex]
										const booking = bookingData[dateIndex][timeIndex]
										return (
											<TableCell
												key={dateIndex}
												className="border border-slate-600"
												padding="none"
											>
												{isBookingAvailable ? (
													<BookingTableBox
														booking_date={format(day, 'MM月dd日(E)', {
															locale: ja,
														})}
														booking_time={TIME_LIST[timeIndex]}
														registName={booking.regist_name}
														name={booking.name}
														url={
															isThursday
																? undefined
																: `/booking?id=${booking.id}`
														}
													/>
												) : (
													<BookingTableBox
														booking_date={format(day, 'MM月dd日(E)', {
															locale: ja,
														})}
														booking_time={TIME_LIST[timeIndex]}
														registName={
															isThursday ? (
																<HiMiniXMark color="red" size={20} />
															) : (
																<PiCircle color="blue" size={20} />
															)
														}
														url={
															isThursday
																? undefined
																: `/booking/new?booking_date=${format(day, 'yyyy-MM-dd', { locale: ja })}&booking_time=${timeIndex}`
														}
													/>
												)}
											</TableCell>
										)
									})}
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							{' '}
							{/* 日付 */}
							<TableRow>
								<TableCell
									className="border border-slate-600 p-2"
									padding="none"
								></TableCell>
								{dateList.map((day, index) => {
									return (
										<TableCell
											key={index}
											className="border border-slate-600 p-2 center w-16"
											padding="none"
										>
											<span>{format(day, 'M月d日(E)', { locale: ja })}</span>
										</TableCell>
									)
								})}
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
				)}
			</Stack>
			<Popup
				ref={ReadMePopupRef}
				title="使い方"
				maxWidth="md"
				open={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
			>
				<Typography variant="body1">
					<p>・〇が付いている予約したい日付、時間帯をクリックすると予約ページに移行します</p>
					<p>
						・予約は１秒でも先に予約ページの確認ボタンを押したほうが優先されます
					</p>
					<p>
						・その他わからない事やバグ(想定外の動作)を発見したらわたべまで連絡ください
					</p>
					<p>
						・消したいけどパスワード忘れて消せなくなった場合もわたべまで(いつか役員に権限を渡す予定です)
					</p>
					<p>・×の日は予約禁止になっています</p>
					<p>※ライブ3週間前からはバンド練習の人優先でお願いします</p>
					<p>※平日の16時半以前のコマは3日前までに学務での予約が必須です</p>
					<p>※休日のコマは終日3日前に学務での予約が必須です</p>
					<p>
						※ダブルブッキングを避けるため、必ずコマ表に予約をいれてから学務に予約しにいってください
					</p>
					<p>
						※繁忙期はなるべく連続2コマなどは避け、譲り合いスタジオに行きましょう
					</p>
					<p>※登録名でボケる時は10文字以内だと上手くいきます</p>
				</Typography>
				<Stack spacing={2} direction="row" className="flex justify-center">
					<Button
						type="button"
						variant="outlined"
						color="inherit"
						onClick={() => setIsPopupOpen(false)}
					>
						閉じる
					</Button>
				</Stack>
			</Popup>
		</div>
	)
}

export default MainPage
