'use client'

import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { BookingCalenderProps } from '@/types/BookingTypes'

const CalendarTable = (props: BookingCalenderProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-collapse border border-base-200">
        <thead>
          <tr>
            <th className="bg-red-500 text-white">MM/DD (E)</th>
            <th className="bg-gray-100">MM/DD (E)</th>
            <th className="bg-gray-100">MM/DD (E)</th>
            <th className="bg-gray-100">MM/DD (E)</th>
            <th className="bg-gray-100">MM/DD (E)</th>
            <th className="bg-blue-500 text-white">MM/DD (E)</th>
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
  );
};

export default CalendarTable;
