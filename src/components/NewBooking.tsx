import React, { use, useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { parseDateString } from '@/lib/CommonFunction'
import { TIME_LIST } from '@/lib/enum/BookingEnum'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

const NewBooking = () => {
  const { register, handleSubmit } = useForm()
  const queryParams = useSearchParams()
  const bookingDate = queryParams.get('booking_date') ?? new Date().toISOString()
  const bookingTime = queryParams.get('booking_time') ?? '0'

  const onSubmit = async (data: any) => {
    const reservationData = {
      booking_date: parseDateString(bookingDate),
      booking_time: Number(bookingTime),
      regist_name: data.regist_name,
      name: data.name,
      password: data.password,
    }

    try {
      const response = await fetch('/api/booking/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      })

      if (response.ok) {
        // Reservation successfully created
        console.log('Reservation created!')
      } else {
        // Handle error response
        console.error('Failed to create reservation')
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error)
    }
  }

  return (
    <div>
      <div>
        <h1>新規予約</h1>
        <p>日付: {format(parseDateString(bookingDate), 'yyyy/MM/dd(E)', { locale: ja })}</p>
        <p>時間: {TIME_LIST[Number(bookingTime)]}</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('regist_name')}
            label="バンド名"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            {...register('name')}
            label="責任者"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            {...register('password')}
            label="パスワード"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            予約する
          </Button>
        </form>
      </div>
    </div>
  )
}

export default NewBooking;