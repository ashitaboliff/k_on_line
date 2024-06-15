import { TIME_LIST } from '@/lib/enum/BookingEnum'
import {
	Table,
	TableBody,
	TableContainer,
	TableRow,
	TableCell,
	Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface BookingDetailProps {
	booking_date: Date
	booking_time: string
	regist_name: string
	name: string
}

const BookingDetailBox = (props: BookingDetailProps) => {
	return (
		<TableContainer className="p-4 flex flex-col justify-center gap-2 box-balance">
			<Table size="small">
				<TableBody>
					<TableRow className="border-y border-gray-400 p-2 w-10">
						<TableCell padding="none" className="w-16 bg-gray-300">
							日時:
						</TableCell>
						<TableCell>
							<Typography variant="body1">
								{format(props.booking_date, 'yyyy年MM月dd日(E)', {
									locale: ja,
								})}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow className="border-b border-gray-400 p-2 w-10">
						<TableCell padding="none" className="w-16 bg-gray-300">
							時間:
						</TableCell>
						<TableCell>
							<Typography variant="body1">
								{TIME_LIST[Number(props.booking_time)]}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow className="border-b border-gray-400 p-2 w-10">
						<TableCell padding="none" className="w-16 bg-gray-300">
							バンド名:
						</TableCell>
						<TableCell>
							<Typography variant="body1">{props.regist_name}</Typography>
						</TableCell>
					</TableRow>
					<TableRow className="border-b border-gray-400 p-2 w-10">
						<TableCell padding="none" className="w-16 bg-gray-300">
							責任者:
						</TableCell>
						<TableCell>
							<Typography variant="body1">{props.name}</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default BookingDetailBox
