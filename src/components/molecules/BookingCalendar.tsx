'use client'

import { format, addDays } from 'date-fns'
import { da, ja } from 'date-fns/locale'
import { BookingCalenderProps } from '@/types/BookingTypes'
import { useState, useEffect } from 'react'

const CalendarTable = () => {
	const [today, setToday] = useState<Date>(new Date())
	let dateRange = Array.from({ length: 6 }, (_, i) => addDays(today, i))
	let dateRangeString = Array.from({ length: 6 }, (_, i) =>
		format(dateRange[i], 'MM/dd(E)', { locale: ja }),
	)

	const nextWeek = () => {
		setToday(addDays(today, 7))
	}

	const prevWeek = () => {
		setToday(addDays(today, -7))
	}

	useEffect(() => {
		dateRange = Array.from({ length: 6 }, (_, i) => addDays(today, i))
		dateRangeString = Array.from({ length: 6 }, (_, i) =>
			format(dateRange[i], 'MM/dd(E)', { locale: ja }),
		)
	}, [today])

	return (
		<div className="overflow-x-auto">
			<div className="flex justify-between items-center mb-4">
				<button className="btn btn-outline" onClick={prevWeek}>
					{'<'}
				</button>
				<span className="text-xl font-bold">
					{dateRangeString[0]}~{dateRangeString[5]}までのコマ表
				</span>
				<button className="btn btn-outline" onClick={nextWeek}>
					{'>'}
				</button>
			</div>
			<table className="table w-full border-collapse border border-gray-200">
				<thead>
					<tr>
						{dateRange.map((date, index) => (
							<th
								key={index}
								className={
									index === 0
										? 'bg-red-500 text-white'
										: index === 5
											? 'bg-blue-500 text-white'
											: 'bg-gray-100'
								}
							>
								{format(date, 'MM/dd (E)')}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: 6 }).map((_, rowIndex) => (
						<tr key={rowIndex}>
							<td className="border p-2">HH:mm~HH:mm</td>
							{Array.from({ length: 5 }).map((_, colIndex) => (
								<td key={colIndex} className="border p-2">
									{colIndex % 2 === 0 ? (
										<span className="text-blue-500">◯</span>
									) : (
										<span className="text-red-500">×</span>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default CalendarTable
