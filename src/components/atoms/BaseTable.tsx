import { ReactNode } from 'react'

type DataItem = {
	label: string
	value: string | ReactNode
}

type Props = {
	data: DataItem[]
}

const BaseTable = (props: Props) => {
	return (
		<div className="p-4 flex flex-col justify-center gap-2 my-2 bg-bg-white shadow-md rounded-md">
			{props.data.map((item, index) => (
				<div key={index} className="p-2 border-b border-border-light">
					<div className="flex">
						<span className="w-24 p-2 font-semibold">{item.label}:</span>
						<span className="p-2">{item.value}</span>
					</div>
				</div>
			))}
		</div>
	)
}

export default BaseTable
