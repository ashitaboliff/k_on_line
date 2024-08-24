import Loading from '@/components/atoms/Loading'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: '予約詳細',
	description: 'あしたぼコマ表の予約詳細',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <Suspense fallback={<Loading />}>{children}</Suspense>
}
