'use client'

import { useState, useEffect, useRef } from 'react'
import {
	TextField,
	Typography,
	Container,
	Stack,
	Box,
	Alert,
  Button,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { TIME_LIST, Booking } from '@/lib/enum/BookingEnum'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import Popup, { PopupRef } from '@/components/atom/Popup'
import Loading from '@/components/atom/Loading'

const schema = yup.object().shape({
  booking_date: yup.date().required('予約日を入力してください'),
  booking_time: yup.number().required('予約時間を入力してください'),
  regist_name: yup.string().required('バンド名を入力してください'),
  name: yup.string().required('責任者名を入力してください'),
})

interface Props {
  id: string
}

const BookingEditForm = (props: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [bookingDetail, setBookingDetail] = useState<Booking>()
  const [editPopupOpen, setEditPopupOpen] = useState(false)
  const [deletePopupOpen, setDeletePopupOpen] = useState(false)
  const editPopupRef = useRef<PopupRef>(undefined)
  const deletePopupRef = useRef<PopupRef>(undefined)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const fetchBookingDetail = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/booking/detail?id=${props.id}`)
      if (response.ok) {
        const data = await response.json()
        setBookingDetail(data.response)
        setValue('booking_date', new Date(data.response.booking_date))
        setValue('booking_time', data.response.booking_time)
        setValue('regist_name', data.response.regist_name)
        setValue('name', data.response.name)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        // alert('エラーが発生しました')
      }
    } catch (error) {
      setIsLoading(false)
      // alert('エラーが発生しました')
    }
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/booking/edit?id=${props.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        router.push(`/booking/detail?id=${props.id}`)
      } else {
        // alert('エラーが発生しました')
      }
    } catch (error) {
      // alert('エラーが発生しました')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchBookingDetail()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>

    </div>
  )
}

export default BookingEditForm