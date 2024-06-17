export const TIME_LIST = [
	'9:00~10:30',
	'10:30~12:00',
	'12:00~13:30',
	'13:30~15:00',
	'15:00~16:30',
	'16:30~18:00',
	'18:00~19:30',
	'19:30~21:00',
]

export type Booking = {
	id: string
	created_at: Date
	booking_date: Date
	booking_time: string
	regist_name: string
	name: string
}

export type BookingLog = {
	id: string
	created_at: Date
	updated_at: Date
	booking_date: Date
	booking_time: string
	regist_name: string
	name: string
	is_deleted: boolean
}
