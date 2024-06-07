import React from 'react'
import { Box, Typography } from '@mui/material'

interface BookingTableBoxProps {
	registName?: string
	name?: string
	url: string
}

export const BookingTableBox: React.FC<BookingTableBoxProps> = ({
	registName,
	name,
	url,
}) => {
	const handleClick = () => {
		window.location.href = url
	}

	return (
		<Box
			className="p-2 cursor-pointer h-20 flex flex-col justify-center items-center text-center overflow-hidden break-words"
			onClick={handleClick}
		>
			<Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
				{registName}
			</Typography>
			<Typography variant="body2">{name}</Typography>
		</Box>
	)
}

export default BookingTableBox
