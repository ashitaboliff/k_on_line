'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Loading from '@/components/atoms/Loading'

const PasswordSchema = yup.object().shape({
  digit1: yup.string().required('数字を入力してください').matches(/^[0-9]+$/, '数字を入力してください'),
  digit2: yup.string().required('数字を入力してください').matches(/^[0-9]+$/, '数字を入力してください'),
  digit3: yup.string().required('数字を入力してください').matches(/^[0-9]+$/, '数字を入力してください'),
  digit4: yup.string().required('数字を入力してください').matches(/^[0-9]+$/, '数字を入力してください'),
})

const AuthPadLock = () => {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(PasswordSchema)
  })

  useEffect(() => {
    if(errors) {
      setError(Object.values(errors).map((error) => error.message).join(', '))
    }
  }, [errors])

  const onSubmit = async (data: { digit1: string, digit2: string, digit3: string, digit4: string }) => {
    setLoading(true)
    const password = `${data.digit1}${data.digit2}${data.digit3}${data.digit4}`
    try {
      const res = await fetch('/api/auth/padlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(password)
      })
      if(res.ok) {
        router.push('/auth/signin')
      }
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>パスワード</label>
          <input type="text" {...register('digit1')} />
          <input type="text" {...register('digit2')} />
          <input type="text" {...register('digit3')} />
          <input type="text" {...register('digit4')} />
        </div>
        <button type="submit">送信</button>
        {loading && <Loading />}
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}