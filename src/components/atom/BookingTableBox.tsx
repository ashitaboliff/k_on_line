import React, { ReactNode } from 'react'
import { Box, Tooltip, Typography } from '@mui/material'

interface BookingTableBoxProps {
	booking_date: string
	booking_time: string
	registName?: string | ReactNode
	name?: string
	url: string
}

export const BookingTableBox: React.FC<BookingTableBoxProps> = ({
	booking_date,
	booking_time,
	registName,
	name,
	url,
}) => {
	const handleClick = () => {
		window.location.href = url
	}

	return (
		<Tooltip title={booking_date + ' ' + booking_time} placement="top">
			<Box
				className="p-2 cursor-pointer h-20 flex flex-col justify-center items-center text-center overflow-hidden break-words"
				onClick={handleClick}
			>
				<Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
					{registName}
				</Typography>
				<Typography variant="body2">{name}</Typography>
			</Box>
		</Tooltip>
	)
}

export default BookingTableBox
