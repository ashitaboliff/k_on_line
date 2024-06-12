import { useState } from 'react'
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material'
import { MdVisibility } from 'react-icons/md'
import { MdVisibilityOff } from 'react-icons/md'
import { useFormContext } from 'react-hook-form'

const PasswordInputField = () => {
	const [showPassword, setShowPassword] = useState(false)
  const { register } = useFormContext()
	const handleClickShowPassword = () => setShowPassword((show) => !show)
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault()
	}

	return (
		<FormControl className="m-1" variant="outlined" fullWidth>
			<InputLabel htmlFor="password">パスワード</InputLabel>
			<OutlinedInput
				id="password"
				label="パスワード"
				type={showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <MdVisibilityOff /> : <MdVisibility />}
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	)
}

export default PasswordInputField
