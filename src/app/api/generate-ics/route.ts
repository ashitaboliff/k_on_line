import { NextRequest, NextResponse } from 'next/server'

// iCalendarファイルを生成する関数
const generateICS = (
	start: string,
	end: string,
	summary: string,
	description: string,
): string => {
	return `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ashitabo//NONSGML v1.0//EN
BEGIN:VEVENT
DTSTART:${start}
DTEND:${end}
SUMMARY:${summary}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`.trim()
}

// APIルートのハンドラー
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const start = searchParams.get('start')
	const end = searchParams.get('end')
	const summary = searchParams.get('summary')
	const description = searchParams.get('description')

	if (!start || !end || !summary || !description) {
		return NextResponse.json(
			{ error: 'Missing required query parameters' },
			{ status: 400 },
		)
	}

	const icsContent = generateICS(start, end, summary, description)

	// レスポンスヘッダーの設定
	return new NextResponse(icsContent, {
		headers: {
			'Content-Type': 'text/calendar',
			'Content-Disposition': 'attachment; filename=event.ics',
		},
	})
}
