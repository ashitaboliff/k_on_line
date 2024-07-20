import { ReactNode } from 'react'

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
  today: Date
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