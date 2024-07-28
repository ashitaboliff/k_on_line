'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { addDays, format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { TIME_LIST } from '@/lib/enum/BookingEnum'
import { Booking } from '@/types/BookingTypes'
import BookingRule from '@/components/molecules/BookingRule'
import Popup, { PopupRef } from '@/components/molecules/Popup'
import { BookingTableBox } from '@/components/molecules/BookingTableBox'
import Loading from '@/components/atoms/Loading'

import { PiCircle } from 'react-icons/pi'
import { HiMiniXMark } from 'react-icons/hi2'

const DayMax = 7
const YesterDate = addDays(new Date(), -1)

const MainPage = () => {
	const [today, setToday] = useState<Date>(YesterDate)
	const [dateList, setDateList] = useState<Date[]>(
		Array.from(
			{ length: DayMax },
			(_, i) =>
				new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
		),
	) // DayMax日分の日付を格納
	const [bookings, setBookings] = useState<Booking[]>([])
	// 第一引数を日付、第二引数を時間として予約情報を格納する二次元配列
	const [bookingData, setBookingData] = useState<Booking[][]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
	const ReadMePopupRef = useRef<PopupRef>(undefined)
	let nextAble = addDays(today, DayMax) <= addDays(YesterDate, DayMax) ? false : true
	let prevAble = addDays(today, -DayMax) >= addDays(YesterDate, -DayMax) ? false : true

	const nextWeek = () => {
		setToday(addDays(today, DayMax))
	}

	const prevWeek = () => {
		setToday(addDays(today, -DayMax))
	}

	const getBooking = async ({
		startDay,
		endDay,
		cache,
	}: {
		startDay: string
		endDay: string
		cache: RequestCache
	}) => {
		const res = await fetch(`/api/booking?startDay=${startDay}&endDay=${endDay}`, {
			cache,
		})
		if (res.ok) {
			const json = await res.json()
			return json.response as Booking[]
		} else {
			return null
		}
	}

	const getUpdate = async ({
		day,
		cache,
	}: {
		day?: Date
		cache?: RequestCache
	} = {
	}) => {
		cache ? setIsLoading(true) : setIsLoading(false)
		if(!day) {
			day = YesterDate
		}
		if(!cache) {
			cache = 'force-cache'
		}
		const startDay = format(day, 'yyyy-MM-dd', { locale: ja })
		const endDay = format(addDays(day, DayMax), 'yyyy-MM-dd', { locale: ja })
		const res = await getBooking({ startDay, endDay, cache })
		if (res) {
			setBookings(res)
			setIsLoading(false)
		} else {
			alert('予約情報の取得に失敗しました')
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getUpdate({ day: today, cache: 'no-cache' })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bookings])

	useEffect(() => {
		setDateList(
			Array.from(
				{ length: DayMax },
				(_, i) =>
					new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
			),
		)
		getUpdate({ day: today })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [today])


	if (isLoading) {
		return <Loading />
	}

	return (
		<div>
			<div className="flex justify-center space-x-2 m-2">
				<button className="btn btn-primary" onClick={() => getUpdate({ day: today, cache: 'no-cache' })}>
					カレンダーを更新
				</button>
				<button
					className="btn btn-outline"
					onClick={() => setIsPopupOpen(true)}
				>
					使い方の表示
				</button>
			</div>
			<div className="flex justify-center space-x-8">
				<Image
					src="/animal_music_band.png"
					alt="logo"
					width={150}
					height={120}
				/>
				<Image src="/animal_dance.png" alt="logo" width={150} height={120} />
			</div>
			<div className="flex flex-col justify-center space-x-2">
				<div className="flex justify-between items-center mb-4 m-auto">
					<button className="btn btn-outline" onClick={prevWeek} disabled={prevAble}>
						{'<'}
					</button>
					<div className="text-xl font-bold mx-2 w-72 text-center">
						{format(dateList[0], 'M/d(E)', { locale: ja })}~{format(dateList[DayMax - 1], 'M/d(E)', { locale: ja })}までのコマ表
					</div>
					<button className="btn btn-outline" onClick={nextWeek} disabled={nextAble}>
						{'>'}
					</button>
				</div>
				<div className='flex justify-center'>
					{' '}
					{/* カレンダー全体 */}
					<table className="w-auto border border-base-200 table-pin-rows table-pin-cols bg-bg-white">
						<thead>
							{' '}
							{/* 日付 */}
							<tr>
								<th className="border border-base-200 w-11"></th>
								{dateList.map((day, index) => {
									return (
										<th
											key={index}
											className="border border-base-200 p-1 w-11 h-9"
										>
											<p className="text-xs text-base-content">
												{format(day, 'MM/dd', { locale: ja })} <br />{' '}
												{format(day, '(E)', { locale: ja })}
											</p>
										</th>
									)
								})}
							</tr>
						</thead>
						<tbody>
							{TIME_LIST.map((time, timeIndex) => (
								<tr key={timeIndex}>
									<td className="border border-base-200 p-1 w-11 h-13 break-words">
										<p className="text-xs text-base-content break-words">
											{time.split('~')[0]}~ <br /> {time.split('~')[1]}
										</p>
									</td>
									{dateList.map((day, dateIndex) => {
										const isThursday = day.getDay() === 4 && timeIndex > 4
										const isBookingAvailable = bookingData[dateIndex][timeIndex]
										const booking = bookingData[dateIndex][timeIndex]
										return (
											<td
												key={dateIndex}
												className="border border-base-200 p-0"
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
																: `/booking/detail?id=${booking.id}`
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
											</td>
										)
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<Popup
				ref={ReadMePopupRef}
				title="使い方"
				maxWidth="sm"
				open={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
			>
				<BookingRule />
				<div className="flex justify-center space-x-2">
					<button
						type="button"
						className="btn btn-outline"
						onClick={() => setIsPopupOpen(false)}
					>
						閉じる
					</button>
				</div>
			</Popup>
		</div>
	)
}

export default MainPage
