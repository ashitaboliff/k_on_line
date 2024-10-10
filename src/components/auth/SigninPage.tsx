'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Loading from '@/components/atoms/Loading'

const SigninPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	if (isLoading) {
		return <Loading />
	}

	return (
		<div>
			<div>新規アカウント作成</div>
			<div className="btn btn-primary" onClick={() => signIn('line')}>
				LINEでログイン
			</div>
		</div>
	)
}

export default SigninPage
