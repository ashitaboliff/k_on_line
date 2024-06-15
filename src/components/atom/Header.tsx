'use client'

import Link from 'next/link'
import { useState } from 'react'

import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Drawer,
	Box,
	List,
	ListItem,
} from '@mui/material'
import { LuMenu } from 'react-icons/lu'
import { RxCountdownTimer } from 'react-icons/rx'
import { MdOutlineEditCalendar } from 'react-icons/md'

const Layout = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
			<AppBar position="static" color="inherit" className="mb-5">
				<Toolbar>
					<Box className="h-10 w-10"></Box>
					<Typography variant="h4" component="div" className="grow text-center">
						<Link href="/">あしたぼコマ表</Link>
					</Typography>
					<IconButton
						edge="end"
						color="inherit"
						aria-label="menu"
						onClick={handleMenuOpen}
					>
						<LuMenu />
					</IconButton>
					<Drawer
						anchor="right"
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
					>
						<List className=" w-36">
							<ListItem className="border-b border-gray-500">
								<Typography variant="h6" className="text-center">
									メニュー
								</Typography>
							</ListItem>
							<ListItem
								onClick={handleMenuClose}
								className="border-b border-gray-500"
							>
								<MdOutlineEditCalendar />
								<Link href="/">　コマ表</Link>
							</ListItem>
							<ListItem
								onClick={handleMenuClose}
								className="border-b border-gray-500"
							>
								<RxCountdownTimer />
								<Link href="/booking/logs">　予約ログ</Link>
							</ListItem>
						</List>
					</Drawer>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Layout
