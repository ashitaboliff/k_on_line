import { useRouter } from 'next/navigation'
import { BookingTableBoxProps } from '@/types/BookingTypes'

export const BookingTableBox = (props: BookingTableBoxProps) => {
	const router = useRouter()
	const handleClick = () => {
		if (props.url) {
			router.push(props.url)
		}
	}
	let registName = props.registName
	let name = props.name
	if (typeof props.registName === 'string' && props.registName.length > 21) {
		registName = props.registName.slice(0, 20) + '...'
	}
	if (typeof props.name === 'string' && props.name.length > 14) {
		name = props.name.slice(0, 13) + '...'
	}

	return (
		<div
			className="w-11 h-13 flex flex-col justify-center items-center text-center break-words py-1"
			onClick={handleClick}
		>
			<p className="text-xxxs text-base-content bold">{registName}</p>
			<p className="text-xxxs text-base-content">{name}</p>
		</div>
	)
}

export default BookingTableBox
