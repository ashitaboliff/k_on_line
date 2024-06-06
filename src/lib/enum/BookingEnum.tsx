export const TIME_LIST = [
  '7:30~9:00',
  '9:00~10:30',
  '10:40~12:10',
  '12:10~13:00',
  '13:00~14:30',
  '14:40~16:10',
  '16:20~17:50',
  '18:00~19:30',
  '19:30~21:00',
]

export type Booking = {
  id: number
  created_at: Date
  booking_date: Date
  booking_time: string
  regist_name: string
  name: string
}