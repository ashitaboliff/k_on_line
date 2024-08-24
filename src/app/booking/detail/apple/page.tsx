'use client'

import { useSearchParams } from 'next/navigation'
import { FaApple } from 'react-icons/fa'

type Props = {
	start: string
	end: string
	summary: string
	description: string
}

const BookingButton = () => {
	const searchParams = useSearchParams()
	const start = searchParams.get('start') || ''
	const end = searchParams.get('end') || ''
	const summary = searchParams.get('summary') || ''
	const description = searchParams.get('description') || ''

	const handleDownloadICS = (props: Props) => {
		const url = `/api/generate-ics?start=${props.start}&end=${props.end}&summary=${props.summary}&description=${props.description}`

		// APIエンドポイントを呼び出してICSファイルをダウンロード
		window.location.href = url
	}

	return (
		<div className="flex flex-col space-y-2">
			<p className="text-center text-base">iOS標準カレンダーに予定を追加する</p>
			<button
				className="btn btn-outline btn-sm"
				onClick={() => handleDownloadICS({ start, end, summary, description })}
			>
				<FaApple color="#000" />
				Appleカレンダーに追加
			</button>
		</div>
	)
}

export default BookingButton
