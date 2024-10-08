export interface Booking {
	id: string
	created_at: Date
	booking_date: Date
	booking_time: string
	regist_name: string
	name: string
}

export interface BookingCalenderProps {
	booking_data: Booking[]
}

export interface BookingTableBoxProps {
	booking_date: string
	booking_time: string
	registName?: string | React.ReactNode
	name?: string
	url: string | undefined
}

export interface BookingLog {
	id: string
	created_at: Date
	updated_at: Date
	booking_date: Date
	booking_time: string
	regist_name: string
	name: string
	is_deleted: boolean
}
