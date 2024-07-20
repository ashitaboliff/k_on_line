import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/molecules/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'あしたぼホームページ',
	description: '信州大学工学部、軽音サークルのあしたぼ、公式ホームページです。',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ja">
			<head>
				<link href="https://fonts.googleapis.com/css2?family=Nicomoji&display=swap" rel="stylesheet" />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
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
