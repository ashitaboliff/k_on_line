'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Loading from '@/components/atoms/Loading'

const PasswordSchema = yup.object().shape({
	digit1: yup
		.string()
		.required('数字を入力してください')
		.matches(/^[0-9]+$/, '数字を入力してください'),
	digit2: yup
		.string()
		.required('数字を入力してください')
		.matches(/^[0-9]+$/, '数字を入力してください'),
	digit3: yup
		.string()
		.required('数字を入力してください')
		.matches(/^[0-9]+$/, '数字を入力してください'),
	digit4: yup
		.string()
		.required('数字を入力してください')
		.matches(/^[0-9]+$/, '数字を入力してください'),
})

const AuthPadLock = () => {
	const router = useRouter()
	const [error, setError] = useState<string | undefined>()
	const [loading, setLoading] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		watch,
		setFocus,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(PasswordSchema),
	})

	useEffect(() => {
		if (errors) {
			setError(
				Object.values(errors)
					.map((error) => error.message)
					.join(', '),
			)
		}
	}, [errors])

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name && value[name]?.length === 1) {
				if (name === 'digit1') setFocus('digit2')
				if (name === 'digit2') setFocus('digit3')
				if (name === 'digit3') setFocus('digit4')
			}
		})
		return () => subscription.unsubscribe()
	}, [watch, setFocus])

	const onSubmit = async (data: {
		digit1: string
		digit2: string
		digit3: string
		digit4: string
	}) => {
		setLoading(true)
		const password = {
			password: `${data.digit1}${data.digit2}${data.digit3}${data.digit4}`,
		}
		try {
			const res = await fetch('/api/auth/padlock', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(password),
			})
			if (res.ok) {
				router.push('/auth/signin')
			} else {
				const error = await res.json()
				console.log(error)
				setError(error.error)
				setLoading(false)
			}
		} catch (error: any) {
			setError(error.message)
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="text-lg font-bold mx-2 text-center">
				部室のパスワードを入力してください
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col items-center justify-center"
			>
				<div>
					<label>パスワード</label>
					<input
						type="text"
						{...register('digit1')}
						maxLength={1}
						className="input input-bordered w-16 h-16 text-center text-2xl"
					/>
					<input
						type="text"
						{...register('digit2')}
						maxLength={1}
						className="input input-bordered w-16 h-16 text-center text-2xl"
					/>
					<input
						type="text"
						{...register('digit3')}
						maxLength={1}
						className="input input-bordered w-16 h-16 text-center text-2xl"
					/>
					<input
						type="text"
						{...register('digit4')}
						maxLength={1}
						className="input input-bordered w-16 h-16 text-center text-2xl"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					送信
				</button>
				{loading && <Loading />}
				{error && <p>{error}</p>}
			</form>
		</div>
	)
}

export default AuthPadLock
