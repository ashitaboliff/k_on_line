import React, { useEffect, useState, useRef } from 'react'
import { TextField, Button, Typography, CircularProgress, Container, Stack } from '@mui/material'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams, useRouter } from 'next/navigation'
import { parseDateString } from '@/lib/CommonFunction'
import { TIME_LIST } from '@/lib/enum/BookingEnum'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import Popup, { PopupRef } from '@/components/atom/Popup'
import Loading from '@/components/atom/Loading'

const schema = yup.object().shape({
  regist_name: yup.string().required('バンド名を入力してください'),
  name: yup.string().required('責任者名を入力してください'),
  password: yup.string().required('パスワードを入力してください'),
})

const NewBooking = () => {
  const router = useRouter()
  const [isState, setIsState] = useState<'loading' | 'input' | 'complate'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const popupRef = useRef<PopupRef>(undefined)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const queryParams = useSearchParams()
  const bookingDate = queryParams.get('booking_date') ?? new Date().toISOString()
  const bookingTime = queryParams.get('booking_time') ?? '0'

  useEffect(() => {
    setIsState('input')
    setPopupOpen(false) // モーダルを閉じる
  }, [])

  useEffect(() => {
    if (isState === 'complate') {
      setPopupOpen(true) // モーダルを表示する
    }
  }, [isState])

  const onSubmit = async (data: any) => {
    const reservationData = {
      booking_date: parseDateString(bookingDate),
      booking_time: Number(bookingTime),
      regist_name: data.regist_name,
      name: data.name,
      password: data.password,
    }

    console.log('reservationData', reservationData)

    try {
      const response = await fetch('/api/booking/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      })

      if (response.ok) {
        setIsState('complate')
        console.log('Reservation created!')
      } else {
        setError('予約に失敗しました。\n予約日時を確認してください。\nエラーコード:' + response.statusText)
        setIsState('input')
        console.error('Failed to create reservation')
      }
    } catch (error) {
      setError('予約に失敗しました。\n何度もこのエラーが出る場合はwatabeggにスクショとともに教えて下さい。\nエラーメッセージ:' + error)
      console.error('Network error:', error)
    }
  }

  if (isState === 'loading') {
    return <Loading />
  }

  return (
    <div>
      <Container maxWidth='md'>
        <Typography variant="h6" className="text-center mb-4">新規予約</Typography>
        <Typography variant='body1' className="text-center mb-4">日付: {format(parseDateString(bookingDate), 'yyyy/MM/dd(E)', { locale: ja })}</Typography>
        <Typography variant='body1' className="text-center mb-4">時間: {TIME_LIST[Number(bookingTime)]}</Typography>
      </Container>
      <Container maxWidth='md'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container maxWidth='sm'>
            <TextField
              {...register('regist_name')}
              label="バンド名"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            {errors.regist_name && <Alert severity="error">{errors.regist_name.message}</Alert>}
            <TextField
              {...register('name')}
              label="責任者"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            {errors.name && <Alert severity="error">{errors.name.message}</Alert>}
            <TextField
              {...register('password')}
              label="パスワード"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            {errors.password && <Alert severity="error">{errors.password.message}</Alert>}
          </Container>
          <Stack spacing={2} direction="row" className='flex justify-center'>
            <Button type="submit" variant="contained" color="success">
              予約する
            </Button>
            <Button
              type='button'
              variant='outlined'
              color='inherit'
              onClick={() =>
                router.push('/')
              }
            >
              カレンダーに戻る
            </Button>
          </Stack>
        </form>
      </Container>
      <Popup
        ref={popupRef}
        title="予約完了"
        maxWidth="md"
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
      >
        <p>予約が完了しました。</p>
        <Button
          type='button'
          variant='outlined'
          color='inherit'
          onClick={() => {
            router.push('/')
            setPopupOpen(false) // モーダルを閉じる
          }}
        >
          カレンダーに戻る
        </Button>
      </Popup>
    </div>
  )
}

export default NewBooking