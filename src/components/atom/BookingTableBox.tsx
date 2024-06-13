import { ReactNode } from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

interface BookingTableBoxProps {
	booking_date: string
	booking_time: string
	registName?: string | ReactNode
	name?: string
	url: string | undefined
}

export const BookingTableBox = (props: BookingTableBoxProps) => {
	const router = useRouter()
	const handleClick = () => {
		if (props.url) {
			router.push(props.url)
		}
	}
	let registName = props.registName
	let name = props.name
	if (typeof props.registName === 'string' && props.registName.length > 12) {
		registName = props.registName.slice(0, 11) + '...'
	}
	if (typeof props.name === 'string' && props.name.length > 14) {
		name = props.name.slice(0, 13) + '...'
	}

	return (
		<Tooltip
			title={props.booking_date + ' ' + props.booking_time}
			placement="top"
		>
			<Box
				className="p-2 cursor-pointer h-20 w-28 flex flex-col justify-center items-center text-center overflow-hidden break-words"
				onClick={handleClick}
			>
				<Typography className="mb-1 text-sm">{registName}</Typography>
				<Typography className="text-xs">{name}</Typography>
			</Box>
		</Tooltip>
	)
}

export default BookingTableBox
