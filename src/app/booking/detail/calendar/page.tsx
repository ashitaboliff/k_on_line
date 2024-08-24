'use client'
import { useRouter } from 'next/navigation'

const Page = () => {
	const router = useRouter()
	return (
		<>
			<div className="p-4 flex flex-col items-center justify-center">
				<div className="text-xl font-bold text-center">
					他アプリでのカレンダー連携
				</div>
				<p>
					他アプリのカレンダーは基本端末標準のカレンダーと同期できると思います。
					そのため、android端末の場合はGoogle、iOS端末の場合はAppleを選択しましょう。
				</p>
				<p>
					ただ、方法が複雑な場合がありますので以下に
					その方法についていくつかのアプリを例に紹介します。
				</p>
				<div className="collapse collapse-arrow bg-bg-white">
					<input type="checkbox" />
					<div className="collapse-title text-xl font-medium">TimeTree</div>
					<div className="collapse-content">
						<p>
							以下のリンクよりGoogleカレンダーもしくはiOS標準カレンダーと同期することで表示できます。
						</p>
						<a
							href="https://support.timetreeapp.com/hc/ja/articles/360000639682-%E4%BB%96%E3%81%AE%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%97%E3%81%9F%E3%81%84-Google-%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC%E3%81%AA%E3%81%A9?openExternalBrowser=1"
							className="underline"
						>
							TimeTreeとの連携
						</a>
					</div>
				</div>
				<div className="collapse collapse-arrow bg-bg-white">
					<input type="checkbox" />
					<div className="collapse-title text-xl font-medium">
						シンプルカレンダー、minical
					</div>
					<div className="collapse-content">
						<p>
							このカレンダーアプリは端末のカレンダーと自動同期のため、端末のデフォルトカレンダーに応じて予定を追加するカレンダーを選んでください。
						</p>
					</div>
				</div>
				<div className="collapse collapse-arrow bg-bg-white">
					<input type="checkbox" />
					<div className="collapse-title text-xl font-medium">
						Cahoカレンダー
					</div>
					<div className="collapse-content">
						<p>
							以下のYahoo知恵袋にやり方が書いてあります。もう眠いので勘弁してください
						</p>
						<a
							href="https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q12293874497"
							className="underline"
						>
							Yahoo知恵袋
						</a>
					</div>
				</div>
				<div className="collapse collapse-arrow bg-bg-white">
					<input type="checkbox" />
					<div className="collapse-title text-xl font-medium">その他</div>
					<div className="collapse-content">
						<p>
							基本時に端末標準のカレンダーとの同期機能が用意されているはずです。自分で探してください。
						</p>
						<p>LOFTの手帳とは同期不可能です</p>
					</div>
				</div>
				<div className="flex flex-row justify-center space-x-2">
					<button className="btn btn-primary" onClick={() => router.back()}>
						前のページに戻る
					</button>
					<button
						className="btn btn-outline"
						onClick={() => router.push('/booking')}
					>
						ホームに戻る
					</button>
				</div>
			</div>
		</>
	)
}

export default Page
