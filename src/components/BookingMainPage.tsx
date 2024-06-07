'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { TIME_LIST, Booking } from '@/lib/enum/BookingEnum'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { BookingTableBox } from '@/components/atom/BookingTableBox'
import Loading from '@/components/atom/Loading'
import { Button, Stack, Typography } from '@mui/material'

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
				console.error('Failed to fetch bookings:', response.statusText)
			}
		} catch (error) {
			console.error('Failed to fetch bookings:', error)
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
		<>
			<Typography variant="h4" className="text-center mb-4">
				あしたぼコマ表
			</Typography>
			<Stack spacing={2} direction="row" className="flex justify-center">
				<Button variant="contained" onClick={() => getUpdate()}>
					カレンダーを更新
				</Button>
				<Button variant="outlined" color="inherit" href="/booking/new">
					使い方の表示
				</Button>
			</Stack>
			<TableContainer component={Paper} className="m-10 w-5/6">
				{' '}
				{/* カレンダー全体 */}
				<Table sx={{ minWidth: 650 }} size="medium">
					<TableHead>
						{' '}
						{/* 日付 */}
						<TableRow>
							<TableCell
								className="border border-slate-600 p-2"
								padding="none"
							></TableCell>
							{dateList.map((day, index) => (
								<TableCell
									key={index}
									className="border border-slate-600 p-2 center w-16"
									padding="none"
								>
									<span>{format(day, 'M月d日(E)', { locale: ja })}</span>
								</TableCell>
							))}
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
								{dateList.map((day, dateIndex) => (
									<TableCell
										key={dateIndex}
										className="border border-slate-600"
										padding="none"
									>
										{bookingData[dateIndex][timeIndex] ? (
											<BookingTableBox
												registName={
													bookingData[dateIndex][timeIndex].regist_name
												}
												name={bookingData[dateIndex][timeIndex].name}
												url={`/booking/${bookingData[dateIndex][timeIndex].id}`}
											/>
										) : (
											<BookingTableBox
												url={`/booking/new?booking_date=${format(day, 'yyyy-MM-dd', { locale: ja })}&booking_time=${timeIndex}`}
											/>
										)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default MainPage
