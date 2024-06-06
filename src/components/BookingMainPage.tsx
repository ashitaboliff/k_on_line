'use client'

import { useState, useEffect, use } from 'react'
import { format, set } from 'date-fns'
import { ja } from 'date-fns/locale'
import { TIME_LIST, Booking } from '@/lib/enum/BookingEnum'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ArrayDayList = Array.from({ length: 15 }, (_, i) => i - 1)

const MainPage = () => {
  const today = new Date()
  const [dateRange, setDateRange] = useState<Date[]>([
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + ArrayDayList[0]),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + ArrayDayList[14]),
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
      const response = await fetch(`/api/booking?startDay=${startDay}&endDay=${endDay}`)
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

  useEffect(() => {
    const today = new Date()
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + ArrayDayList[0])
    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + ArrayDayList[14])
    setDateRange([startDate, endDate])
    setDateRangeString([
      format(startDate, 'yyyy-MM-dd', { locale: ja }),
      format(endDate, 'yyyy-MM-dd', { locale: ja }),
    ])
    getBooking()
  }, [])

  useEffect(() => {
    if (dateRangeString[0] !== '' && dateRangeString[1] !== '') {
      getBooking()
      setDateList(generateDateList(dateRange[0], dateRange[1]))
    }
  }, [dateRangeString])

  useEffect(() => {
    const initialBookingList = Array.from({ length: dateList.length }, () =>
      Array(TIME_LIST.length).fill(null)
    )

    bookings.forEach((booking) => {
      const bookingDate = new Date(booking.booking_date)
      const dateIndex = dateList.findIndex(
        (date) =>
          date.getFullYear() === bookingDate.getFullYear() &&
          date.getMonth() === bookingDate.getMonth() &&
          date.getDate() === bookingDate.getDate()
      );
      const timeIndex = Number(booking.booking_time)

      console.log('index:', dateIndex, timeIndex)

      if (dateIndex !== -1 && timeIndex !== -1) {
        initialBookingList[dateIndex][timeIndex] = booking
      }
    })

    setBookingData(initialBookingList)
    console.log('initialBookingList:', initialBookingList)
  }, [dateList, bookings])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div>
        <h1>あしたぼコマ表</h1>
      </div>
      <div>
        <span>{dateRangeString[0]}~{dateRangeString[1]}のコマ表</span>
      </div>
      <TableContainer component={Paper}> {/* カレンダー全体 */}
        <Table sx={{ minWidth: 650 }} size="medium">
          <TableHead> {/* 日付 */}
            <TableRow>
              <TableCell className='border'></TableCell>
              {dateList.map((day, index) => (
                <TableCell key={index} align='center' className='border'>
                    <span>{format(day, 'M月d日(E)', { locale: ja })}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
              {TIME_LIST.map((time, timeIndex) => (
                <TableRow key={timeIndex}>
                  <TableCell className='border' ><span>{time}</span></TableCell>
                  {dateList.map((day, dateIndex) => (
                    <TableCell key={dateIndex} className='border'>
                      {bookingData[dateIndex][timeIndex]
                        ? bookingData[dateIndex][timeIndex].name
                        : ''
                      }
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