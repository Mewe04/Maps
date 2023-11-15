import { EditLocation, Menu as MenuIcon } from '@mui/icons-material'
import CancelIcon from '@mui/icons-material/Cancel'
import {
	AppBar,
	Box,
	IconButton,
	MenuItem,
	Menu as MuiMenu,
	Toolbar,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'

function AppBarComponent({ isEditing, setIsEditing }) {
	const [anchorEl, setAnchorEl] = useState(null)

	const handleMenuClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleEditToggle = () => {
		setIsEditing(!isEditing)
		handleMenuClose()
	}

	return (
		<AppBar position='static'>
			<Toolbar>
				<IconButton color='inherit' onClick={handleMenuClick}>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' sx={{ ml: 1 }}>
					Карта Взаимодейтсвия: ГеоНавигатор
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<MuiMenu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
				>
					<MenuItem onClick={handleEditToggle}>
						<IconButton color='inherit'>
							{isEditing ? <CancelIcon /> : <EditLocation />}
						</IconButton>
						{isEditing
							? 'Выйти из режима редактирования меток'
							: 'Перейти в режим редактирования меток'}
					</MenuItem>
				</MuiMenu>
			</Toolbar>
		</AppBar>
	)
}

export default AppBarComponent
