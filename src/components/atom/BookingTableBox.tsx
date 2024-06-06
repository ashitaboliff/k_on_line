import React from 'react'
import { Box, Typography } from '@mui/material'

interface BookingTableBoxProps {
  registName?: string
  name?: string
  url: string
}

export const BookingTableBox: React.FC<BookingTableBoxProps> = ({ registName, name, url }) => {
  const handleClick = () => {
    window.location.href = url
  }

  return (
    <Box
      className="p-4 cursor-pointer"
      onClick={handleClick}
    >
      <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
        {registName}
      </Typography>
      <Typography variant="body1">
        {name}
      </Typography>
    </Box>
  )
}

export default BookingTableBox