'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { RoleMap, PartMap, Profile } from '@/types/UserTypes'
import { generateFiscalYearObject } from '@/lib/CommonFunction'
import Loading from '@/components/atoms/Loading'
import InfoMessage from '@/components/atoms/InfoMessage'
import TextInputField from '@/components/atoms/TextInputField'
import Popup, { PopupRef } from '@/components/molecules/Popup'

const expectedYear = generateFiscalYearObject()

const schema = yup.object().shape({
	expected: yup
		.mixed()
		.oneOf(expectedYear.map((year) => year.value))
		.required('卒業予定年度を選択してください'),
	role: yup
		.mixed()
		.oneOf(Object.keys(RoleMap).map((role) => role))
		.required('役割を選択してください'),
	part: yup
		.mixed()
		.oneOf(Object.keys(PartMap).map((part) => part))
		.required('パートを選択してください'),
})

const SigninSetting = () => {
	const session = useSession()
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	})
}
