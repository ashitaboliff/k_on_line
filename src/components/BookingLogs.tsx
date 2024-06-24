'use client'

import { useEffect, useState } from 'react'
import { BookingLog, TIME_LIST } from '@/lib/enum/BookingEnum'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Chip,
	Stack,
	Typography,
	Button,
} from '@mui/material'
import { TiDeleteOutline } from 'react-icons/ti'
import Loading from './atom/Loading'

type BookingLogsFormated = {
	id: string
	created_at: string
	updated_at: string
	booking_date: string
	booking_time: string
	name: string
	regist_name: string
	is_deleted: boolean
}

const BookingLogs = () => {
	const [logs, setLogs] = useState<BookingLog[] | undefined>(undefined)
	const [formattedLogs, setFormattedLogs] = useState<
		BookingLogsFormated[] | undefined
	>(undefined)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchLogs = async () => {
		setIsLoading(true)
		try {
			const response = await fetch('/api/booking/logs', {
				cache: 'no-cache',
			})
			if (response.ok) {
				const data = await response.json()
				setLogs(data.response)
			} else {
				console.error('Failed to fetch booking logs')
			}
		} catch (error) {
			console.error('Error fetching booking logs:', error)
		}
		setIsLoading(false)
	}

	const formatLogs = (logs: BookingLog[]) => {
		setLogs(undefined)
		setIsLoading(true)
		const formattedLogs = logs.map((log) => ({
			id: log.id,
			created_at: format(log.created_at, 'yyyy-MM-dd HH:mm:ss', { locale: ja }),
			updated_at: format(log.updated_at, 'yyyy-MM-dd HH:mm:ss', { locale: ja }),
			booking_date: format(log.booking_date, 'yyyy年MM月dd日', { locale: ja }),
			booking_time: TIME_LIST[Number(log.booking_time)],
			name: log.name,
			regist_name: log.regist_name,
			is_deleted: log.is_deleted,
		}))
		setFormattedLogs(formattedLogs)
		setIsLoading(false)
	}

	useEffect(() => {
		fetchLogs()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (logs) {
			formatLogs(logs)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [logs])

	if (isLoading || !formattedLogs) {
		return <Loading />
	}

	return (
		<div>
			<Typography variant="h4" className="text-center m-5">
				予約ログ
			</Typography>
			<Stack spacing={2} direction="row" className="flex justify-center m-2">
				<Button variant="contained" color="success" onClick={() => fetchLogs()}>
					ログを更新
				</Button>
			</Stack>
			<Stack direction="row" className="flex justify-center m-5">
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell>ID</TableCell>
								<TableCell>予約日</TableCell>
								<TableCell>予約時間</TableCell>
								<TableCell>バンド名</TableCell>
								<TableCell>責任者</TableCell>
								<TableCell>作成日</TableCell>
								<TableCell>更新日</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{formattedLogs.map((log) => (
								<TableRow key={log.id}>
									<TableCell>
										{log.is_deleted ? (
											<Chip
												label="削除済"
												icon={<TiDeleteOutline />}
												color="error"
											/>
										) : null}
									</TableCell>
									<TableCell>{log.id}</TableCell>
									<TableCell>{log.booking_date}</TableCell>
									<TableCell>{log.booking_time}</TableCell>
									<TableCell>{log.name}</TableCell>
									<TableCell>{log.regist_name}</TableCell>
									<TableCell>{log.created_at}</TableCell>
									<TableCell>{log.updated_at}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Stack>
		</div>
	)
}

export default BookingLogs
