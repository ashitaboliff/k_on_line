// 気が向いたら作る
// import {
// 	FormControl,
// 	FormControlProps,
// 	FormHelperText,
// 	InputLabel,
// 	Select,
// 	SelectProps,
// } from '@mui/material'
// import { ReactNode, useMemo } from 'react'

// interface Props extends Omit<FormControlProps, 'children' | 'id' | 'onChange'> {
// 	helperText?: ReactNode
// 	label?: ReactNode
// 	SelectProps?: Omit<SelectProps, 'label' | 'labelId' | 'variant'>
// }

// export const SelectField = ({
// 	helperText,
// 	label,
// 	SelectProps,
// 	...props
// }: Props) => {
// 	const labelId = useMemo(
// 		() =>
// 			SelectProps?.id !== undefined ? `${SelectProps?.id}-label` : undefined,
// 		[SelectProps?.id],
// 	)

// 	return (
// 		<FormControl {...props}>
// 			<InputLabel id={labelId}>{label}</InputLabel>
// 			<Select
// 				{...SelectProps}
// 				id={SelectProps?.id}
// 				labelId={labelId}
// 				label={label}
// 				value={SelectProps?.value}
// 				onChange={SelectProps?.onChange}
// 			>
// 				{SelectProps?.children}
// 			</Select>
// 			{!!helperText && <FormHelperText>{helperText}</FormHelperText>}
// 		</FormControl>
// 	)
// }
