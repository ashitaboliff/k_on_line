'use client'

import { useEffect, useState, useCallback } from 'react'
import { TIME_LIST } from '@/lib/enum/BookingEnum'
import { BookingLog } from '@/types/BookingTypes'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { TiDeleteOutline } from 'react-icons/ti'
import Loading from '@/components/atoms/Loading'

const BookingLogs = () => {
	const [formattedLogs, setFormattedLogs] = useState<BookingLog[] | undefined>(
		undefined,
	)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchLogs = useCallback(async () => {
		setIsLoading(true)
		try {
			const response = await fetch('/api/booking/logs', {
				cache: 'no-cache',
			})
			if (response.ok) {
				const data = await response.json()
				const formattedData = data.response.map((log: BookingLog) => ({
					...log,
					created_at: format(log.created_at, 'yyyy/MM/dd', { locale: ja }),
					updated_at: format(log.updated_at, 'yyyy/MM/dd', { locale: ja }),
					booking_date: format(log.booking_date, 'yyyy/MM/dd', { locale: ja }),
					booking_time: TIME_LIST[Number(log.booking_time)],
				}))
				setFormattedLogs(formattedData)
			} else {
				console.error('Failed to fetch booking logs')
			}
		} catch (error) {
			console.error('Error fetching booking logs:', error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchLogs()
	}, [fetchLogs])

	if (isLoading) return <Loading />

	return (
		<div>
			<h1 className="text-4xl font-bold text-center my-5">予約ログ</h1>
			<div className="flex justify-center my-4">
				<button className="btn btn-primary" onClick={fetchLogs}>
					ログを更新
				</button>
			</div>
			<div className="overflow-x-auto w-full flex justify-center">
				<table className="table table-zebra table-sm w-full max-w-36">
					<thead>
						<tr>
							<th></th>
							<th>予約日</th>
							<th>予約時間</th>
							<th>バンド名</th>
							<th>責任者</th>
							{/* <th>作成日</th>
							<th>更新日</th> */}
						</tr>
					</thead>
					<tbody>
						{formattedLogs?.map((log) => (
							<tr key={log.id}>
								<td>
									{log.is_deleted && (
										<div className="badge badge-error text-bg-light">
											<TiDeleteOutline className="inline" />
										</div>
									)}
								</td>
								<td>{log.booking_date}</td>
								<td>{log.booking_time}</td>
								<td>{log.name}</td>
								<td>{log.regist_name}</td>
								{/* <td>{log.created_at}</td>
								<td>{log.updated_at}</td> */}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default BookingLogs
