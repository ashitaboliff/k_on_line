import { TIME_LIST } from '@/lib/enum/BookingEnum'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import BaseTable from '@/components/atoms/BaseTable'

interface BookingDetailProps {
	booking_date: Date
	booking_time: string
	regist_name: string
	name: string
}

const BookingDetailBox = (props: BookingDetailProps) => {
	const data = [
		{
			label: '日時',
			value: format(props.booking_date, 'yyyy年MM月dd日(E)', { locale: ja }),
		},
		{
			label: '時間',
			value: TIME_LIST[Number(props.booking_time)],
		},
		{
			label: 'バンド名',
			value: props.regist_name,
		},
		{
			label: '責任者',
			value: props.name,
		},
	]

	return <BaseTable data={data} />
}

export default BookingDetailBox
