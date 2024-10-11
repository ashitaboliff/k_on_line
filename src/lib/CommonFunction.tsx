export const parseDateString = (dateString: string): Date => {
	const [year, month, day] = dateString.split('-').map(Number)
	return new Date(year, month - 1, day, 0, 0, 0, 0)
}

export const JSTToUTC = (date: Date): Date => {
	return new Date(date.getTime() - 9 * 60 * 1000 * 60)
}

export const UTCToJST = (date: Date): Date => {
	return new Date(date.getTime() + 9 * 60 * 1000 * 60)
}

export const generateFiscalYearObject = () => {
	const currentYear = new Date().getFullYear() // 現在の年を取得
	const startYear = currentYear - 10 // 10年前
	const endYear = currentYear + 5 // 5年後

	// "XX年度"のオブジェクトを生成
	const fiscalYearObject = Array.from(
		{ length: endYear - startYear + 1 },
		(_, i) => {
			const year = startYear + i
			return {
				key: `${year % 100}年度`, // 西暦の下2桁で "XX年度"を作成
				value: `${year % 100}`, // 下2桁の数字を文字列として value に設定
			}
		},
	)

	// "それ以前" と "それ以降" を追加
	fiscalYearObject.unshift({ key: 'それ以前', value: 'before' })
	fiscalYearObject.push({ key: 'それ以降', value: 'after' })

	return fiscalYearObject
}
