'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { TIME_LIST } from '@/lib/enum/BookingEnum'
import { format } from 'date-fns'
import { is, ja } from 'date-fns/locale'
import Loading from '@/components/atom/Loading'

import { TextField, Button, Typography, Container, Stack, Box, Alert } from '@mui/material'

const passschema = yup.object({
  password: yup.string().required('パスワードを入力してください'),
})

interface Props {
  id: string
  isAuth: boolean
  setAuth: () => void
}

const BookingEditAuth = (props: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(passschema),
  })

  const onSubmit = async (data: { password: string }) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/booking/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: props.id,
          password: data.password,
        }),
      })
      if (response.ok) {
        // router.push(`/booking/edit?id=${router.query.id}`)
      } else {
        setIsLoading(false)
        alert('パスワードが違います')
      }
    } catch (error) {
      setIsLoading(false)
      alert('エラーが発生しました')
    }
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-2">パスワード</label>
        <input
          type="password"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          {...register('password')}
        />
        {errors.password && (
          <Alert severity='error'>{errors.password.message}</Alert>
        )}
        <Button
          type="submit"
          variant='contained'
          color='success'
        >
          ログイン
        </Button>
        <Button
          variant='outlined'
          color='inherit'
          onClick={() => router.push(`/booking?id=${props.id}`)}
        >
          予約詳細に戻る
        </Button>
      </form>
    </div>
  )
}
