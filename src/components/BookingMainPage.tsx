'use client'

import { useState, useEffect } from 'react'
import { format, set } from 'date-fns'
import { ja } from 'date-fns/locale'
import { TIME_LIST } from '@/lib/enum/BookingEnum'
import { Hono } from 'hono'

const dayList = Array.from({ length: 15 }, (_, i) => i - 1)

const MainPage = () => {
  const [dateRange, setDateRange] = useState<Date[]>([new Date(), new Date()])
  const [dateRangeString, setDateRangeString] = useState<string[]>(['', ''])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getBooking = async () => {

  }

  useEffect(() => {
    const today = new Date()
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayList[0])
    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayList[14])
    setDateRange([startDate, endDate])
  }, [])

  useEffect(() => {
    setDateRangeString([
      format(dateRange[0], 'yyyy-MM-dd', {locale : ja}),
      format(dateRange[1], 'yyyy-MM-dd', {locale : ja}),
    ])
  }, [dateRange])


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
              <span>{format(set(dateRange[0], { date: dateRange[0].getDate() + day }), 'M月d日(E)', {locale : ja})}</span>
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