import { Typography, CircularProgress } from '@mui/material'

const Loading = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="text-center">
				<CircularProgress />
				<Typography variant="h6" className="mt-4">
					Loading...
				</Typography>
			</div>
		</div>
	)
}

export default Loading
