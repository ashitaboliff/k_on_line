# Reactの基礎
ここからはReact, Next.jsの基礎、基本について解説していきます。VS Codeを開きながら耳をかっぽじって、目を見開いて読んでください。
## App Router
あ～～もうせっかくプログラミングできると思ったのに意味不明の英単語から始まって最悪の気分ですね。App Routerについてやっていきます。

### App Routerの基礎
App Routerとはなんなのか、僕も別にちゃんと理解してるわけじゃないので雑に説明しますがそんな難しい話じゃないです。VS Codeは開いていますね？じゃあエクスプローラーのタブからファイル見て、srcというフォルダを開いてさらにappというフォルダを開いてください。

page.tsxだのlayout.tsxだのbookingだのいろいろ出てきましたね。なんだこれと思ってるはずです。なんでしょうねぇこれ。

まあ説明するかしゃあないし

まず！このApp Routerというのはずばり、このappというフォルダに入ってるやつらを実際にWebのページとして読み込みますよ～というただそんだけの話です。大層な名前のわりに単純やね～わかりにくい名前つけやがってよお

ただ！これにもいろいろルールがあって、まあ全部解説するのは面倒くさいのでざっくりやります。

まず！app直下のpage.tsxから、意味不明の拡張子ですね。これはreact+typescriptのための拡張子です。まあ知っといてください。
で、この中身を見るとこんな感じ
```tsx
'use client'

import React from 'react'
import MainPage from '@/components/BookingMainPage'

const Page = () => {
	return <MainPage />
}

export default Page
```
みじか！こんな短くていいんや…という感じですがこんな短くていいんです。ほかがくそ長いので
このpage.tsxはreactの仕組みとして、そのpage.tsxとディレクトリと同じパスにアクセスするとpage.tsxを読み込みますよ～というものです。app直下というのはすなわちローカル環境でいうところの localhost:3000 にアクセスした瞬間に読み込まれるということです。

今何が読み込まれているかというと、あしたぼのコマ表ですね。すなわちこれがあしたぼのコマ表を出力しているんです。

え？そんなわけなくない？んな短いので？と思うかもしれませんがまあ焦んな、いったんその話は置いておきます。

では今度はbookingを開いてみましょう。なんかいろいろありますね、page.tsxとlayout.tsx、フォルダにはedit,logs,newがあります。これらのフォルダを開くとまたpage.tsxとlayout.tsxです。無間地獄？

つまり！さっきの話を踏まえて言うと、localhost:3000/booking にアクセスしたときはこのapp/booking直下にあるpage.tsxが、 localhost:3000/booking/new にアクセスしたときはapp/booking/new直下にあるpage.tsxが読み込まれるんです！

まあむずくないよね？単純だよね？ここまでついてこれてる？やばかったら手上げて

で、じゃあlayout.tsxはなんなのという話になりますが、これは読んで字のごとくレイアウトです。まあここは説明難しいからほかのページのコピペでいいよ。てか貼るからこれコピペして
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
	return <>{children}</>
}
```
ただ、一点だけ変えてほしいところとしてtitleとdescriptionです。これはそのページのタイトルと説明で、別にざっくり書いてくれればいい！そんで新しいページが必要になったらオナシャス！

### App Routerの応用？
今ブランチがdevelop-mainになっている人はわかると思いますがなんかnot-found.tsxってのが見えますね。これはNext.jsがこのファイル見つけると404エラー、すなわちなんもページないときにこのnot-found.tsxを出してくれるようになるんです。便利ですね～これはまだ適当にしか書いてないので誰かに書いてもらおうと思います。

あとappディレクトリの下にapiって名前のフォルダがありますがこれはバックエンドのためのフォルダです。デザインの人は関係ないけどDockerを使う君らは触ることになります。気合い入れろ！
