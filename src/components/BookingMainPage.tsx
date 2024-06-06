'use client'

import { useState, useEffect } from 'react'
import { format, set } from 'date-fns'
import { ja } from 'date-fns/locale'
import { TIME_LIST } from '@/lib/enum/BookingEnum'

const dayList = Array.from({ length: 15 }, (_, i) => i)

const MainPage = () => {
  const today = new Date()
  const [dateRange, setDateRange] = useState<Date[]>([
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayList[0]),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayList[14]),
  ])
  const [dateRangeString, setDateRangeString] = useState<string[]>(['', ''])
  const [bookings, setBookings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getBooking = async () => {
    setIsLoading(true)
    const startDay = format(dateRange[0], 'yyyy-MM-dd', { locale: ja })
    const endDay = format(dateRange[1], 'yyyy-MM-dd', { locale: ja })
    try {
      const response = await fetch(`/api/booking?startDay=${startDay}&endDay=${endDay}`)
      if (response.ok) {
        const data = await response.json()
        console.log('data:', data)
        setBookings(data)
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
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayList[0])
    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayList[14])
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
    }
  }, [dateRangeString])

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
      <div> {/* カレンダー全体 */}
        {dayList.map((day) => (
          <div key={day}>
            <div> {/* 日付 */}
              <span>{format(set(dateRange[0], { date: dateRange[0].getDate() + day }), 'M月d日(E)', { locale: ja })}</span>
            </div>
            <div> {/* コマ */}
              {TIME_LIST.map((time) => (
                <div key={time}>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MainPage