import React, { useImperativeHandle, forwardRef } from 'react'
import { Modal, Box, Typography } from '@mui/material'
import { ReactNode } from 'react'
import clsx from 'clsx'

export type PopupRef =
	| {
			show: () => void
			close: () => void
	  }
	| undefined

const Popup = forwardRef<
	PopupRef,
	{
		title: string
		children?: ReactNode
		maxWidth?: string
		open: boolean
		onClose: () => void
	}
>(({ title, children, maxWidth, open, onClose }, ref) => {
	useImperativeHandle(ref, () => ({
		show: () => onClose(), // Note: It would be better to have a show and close function here
		close: () => onClose(),
	}))

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
			className="flex items-center justify-center"
		>
			<Box
				className={clsx(
					'bg-base-100 rounded-lg shadow-lg p-6',
					maxWidth && `max-w-${maxWidth}`,
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<Typography id="modal-title" variant="h6" className="text-center mb-4">
					{title}
				</Typography>
				<div id="modal-description" className="text-left">
					{children}
				</div>
			</Box>
		</Modal>
	)
})

Popup.displayName = 'Popup'

export default Popup
