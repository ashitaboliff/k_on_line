import { NextApiRequest, NextApiResponse } from 'next'

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { start, end, summary, description } = req.query

	if (!start || !end || !summary || !description) {
		return res.status(400).json({ error: 'Missing required query parameters' })
	}

	const icsContent = generateICS(
		start as string,
		end as string,
		summary as string,
		description as string,
	)

	res.setHeader('Content-Type', 'text/calendar')
	res.setHeader('Content-Disposition', 'attachment; filename=event.ics')
	res.status(200).send(icsContent)
}
