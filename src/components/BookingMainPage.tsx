'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { TIME_LIST } from '@/lib/enum/BookingEnum'
import { Hono } from 'hono'

const dayList = Array.from({ length: 15 }, (_, i) => i - 1)

const MainPage = () => {
  const today = new Date()
  const [dateRange, setDateRange] = useState<Date[]>([
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayList[0]),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayList[14]),
  ])

  return (
    <>
      <div>
        <h1>あしたぼコマ表</h1>
      </div>
      <div>
        <span>{format(dateRange[0], 'YYYY-MM-DD', {locale : ja})}~{format(dateRange[1], 'YYYY-MM-DD', {locale : ja})}のコマ表</span>
      </div>
      <div>

      </div>
    </>
  )
}

export default MainPage