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