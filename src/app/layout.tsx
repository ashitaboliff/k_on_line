import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/atom/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: '予約カレンダーページ',
	description: 'あしたぼの予約カレンダー',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ja">
			<body className={inter.className}>
				<div
					className="flex space-x-4"
					dangerouslySetInnerHTML={{
						__html:
							'<!-- 拙い知識で作ったやつなので、可読性めっちゃ低くて申し訳ないけど頑張ってね！！！ 変態糞学生 -->' +
							'<!-- てことでソースコードはこちらからhttps://github.com/watabegg/k_on_line -->',
					}}
				/>
				<Header />
				{children}
			</body>
		</html>
	)
}
