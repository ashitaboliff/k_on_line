import { useEffect, useState, useRef, use } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Booking } from '@/types/BookingTypes'
import { format } from 'date-fns'
import Loading from '@/components/atoms/Loading'
import Popup, { PopupRef } from '@/components/molecules/Popup'
import BookingDetailBox from '@/components/molecules/BookingDetailBox'
import { TIME_LIST } from '@/lib/enum/BookingEnum'

import { PiMicrosoftOutlookLogo } from 'react-icons/pi'
import { FaApple, FaYahoo } from 'react-icons/fa'
import { SiGooglecalendar } from 'react-icons/si'

const BookingDetail = () => {
	const id = useSearchParams().get('id')
	const [bookingDetail, setBookingDetail] = useState<Booking | undefined>(
		undefined,
	)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
	let bookingDate: Date[] = []
	const calendarAddPopupRef = useRef<PopupRef>(undefined)
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

	useEffect(() => {
		if (bookingDetail) {
			bookingDate = TIME_LIST[Number(bookingDetail.booking_time)]
				.split('~')
				.map(
					(time) =>
						new Date(
							new Date(bookingDetail.booking_date).setHours(
								...(time.split(':').map(Number) as [
									number,
									number,
									number,
									number,
								]),
							),
						),
				) // chat GPTに作らせた激やばコード、意味はchat GPTに聞いてな
		}
	}, [bookingDetail, bookingDate])

	if (isLoading) {
		return <Loading />
	}

	if (!bookingDetail) {
		return (
			<div className="p-4 flex flex-col items-center justify-center">
				<div className="text-xl font-bold text-center">予約詳細</div>
				<div className="p-4 flex flex-col justify-center gap-2">
					<div role="alert" className="alert alert-error w-80">
						エラー
					</div>
					<div className="text-sm text-center">
						予約情報が見つかりませんでした。
						<br />
						ホームに戻ってもう一度試してください。
					</div>
					<button
						className="btn btn-outline"
						onClick={() => router.push('/booking')}
					>
						ホームに戻る
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="p-4 flex flex-col items-center justify-center">
			<div className="text-xl font-bold text-center">予約詳細</div>
			<BookingDetailBox
				booking_date={bookingDetail.booking_date}
				booking_time={bookingDetail.booking_time}
				regist_name={bookingDetail.regist_name}
				name={bookingDetail.name}
			/>
			<div className="flex flex-row justify-center space-x-2">
				<button
					className="btn btn-primary"
					onClick={() => router.push(`/booking/edit?id=${bookingDetail?.id}`)}
				>
					編集
				</button>
				<button
					className="btn btn-tertiary"
					onClick={() => setIsPopupOpen(true)}
				>
					カレンダーに追加する
				</button>
				<button
					className="btn btn-outline"
					onClick={() => router.push('/booking')}
				>
					ホームに戻る
				</button>
			</div>
			<Popup
				ref={calendarAddPopupRef}
				open={isPopupOpen}
				onClose={() => setIsPopupOpen(false)}
				title="カレンダーに追加"
				maxWidth="sm"
			>
				<div className="text-center">
					<div>
						<p>予定を追加するカレンダーアプリを選択してください。</p>
						<a href={'/booking/detail/calendar'} className="underline">
							以下にないアプリを利用の場合はこちら
						</a>
						<div className="flex justify-center gap-1">
							<button
								className="btn btn-outline btn-sm"
								onClick={() =>
									open(
										`https://www.google.com/calendar/render?
										action=TEMPLATE&
										text=${encodeURIComponent(bookingDetail.regist_name)}&
										dates=${encodeURIComponent(format(bookingDate[0], "yyyyMMdd'T'HHmmss"))}/${encodeURIComponent(format(bookingDate[1], "yyyyMMdd'T'HHmmss"))}&
										details=${encodeURIComponent(bookingDetail.name)}による音楽室でのコマ予約&
										location=あしたぼ`,
									)
								}
							>
								<SiGooglecalendar color="#2180FC" />
								Google
							</button>
							{/* <button
								className="btn btn-outline btn-sm"
								onClick={() =>
									open(
										`https://outlook.office.com/calendar/action/compose&
										subject=${encodeURIComponent(bookingDetail.regist_name)}&
										startdt=${encodeURIComponent(format(bookingDate[0], "yyyy-MM-dd'T'HH:mm:ss"))}&
										enddt=${encodeURIComponent(format(bookingDate[1], "yyyy-MM-dd'T'HH:mm:ss"))}&
										body=${encodeURIComponent(bookingDetail.name)}による音楽室でのコマ予約&
										location=あしたぼ`,
									)
								}
							>
								<PiMicrosoftOutlookLogo color="#0072C6" />
								Outlook なんか無理なのであきらめ
							</button> */}
							<button
								className="btn btn-outline btn-sm"
								onClick={() =>
									open(
										`https://calendar.yahoo.co.jp/?v=60&
										title=${encodeURIComponent(bookingDetail.regist_name)}&
										st=${encodeURIComponent(format(bookingDate[0], "yyyyMMdd'T'HHmmss"))}&
										et=${encodeURIComponent(format(bookingDate[1], "yyyyMMdd'T'HHmmss"))}&
										desc=${encodeURIComponent(bookingDetail.name)}による音楽室でのコマ予約&
										in_loc=あしたぼ`,
									)
								}
							>
								<FaYahoo color="#720E9E" />
								Yahoo!
							</button>
							<button
								className="btn btn-outline btn-sm"
								onClick={() =>
									(window.location.href = `/booking/detail/apple?
									start=${encodeURIComponent(format(bookingDate[0], "yyyyMMdd'T'HHmmss"))}&
									end=${encodeURIComponent(format(bookingDate[1], "yyyyMMdd'T'HHmmss"))}&
									summary=${encodeURIComponent(bookingDetail.regist_name)}&
									description=${encodeURIComponent(bookingDetail.name)}による音楽室でのコマ予約&
									openExternalBrowser=1`)
								}
							>
								<FaApple color="#000" />
								Apple
							</button>
						</div>
					</div>
					<div className="mt-4">
						<button
							className="btn btn-outline"
							onClick={() => setIsPopupOpen(false)}
						>
							閉じる
						</button>
					</div>
				</div>
			</Popup>
		</div>
	)
}

export default BookingDetail
