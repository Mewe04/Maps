import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Snackbar,
	TextField,
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import React, { useState } from 'react'

export default function AddDialog({
	openAddDialog,
	setOpenAddDialog,
	addMarker,
	addLatLng,
}) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const handleTitleChange = event => {
		setTitle(event.target.value)
	}

	const handleDescriptionChange = event => {
		setDescription(event.target.value)
	}

	const handleAdd = () => {
		addMarker(addLatLng, title, description)
		setTitle('')
		setDescription('')
		setOpenSnackbar(true)
		setOpenAddDialog(false)
	}

	const [openSnackbar, setOpenSnackbar] = useState(false)

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpenSnackbar(false)
	}

	function ExitDialog() {
		setTitle('')
		setDescription('')
		setOpenAddDialog(false)
	}

	return (
		<>
			<Dialog open={openAddDialog} onClose={ExitDialog}>
				<DialogTitle>Добавление метки</DialogTitle>
				<DialogContent>
					<TextField
						label='Заголовок'
						value={title} // Используем новый prop для значения
						onChange={handleTitleChange} // Используем новую функцию для установки значения
					/>
					<TextField
						label='Описание'
						value={description} // Используем новый prop для значения
						onChange={handleDescriptionChange} // Используем новую функцию для установки значения
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAdd}>Добавить</Button>
					<Button onClick={ExitDialog}>Закрыть</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<MuiAlert
					onClose={handleCloseSnackbar}
					severity='success'
					sx={{ width: '100%' }}
				>
					Метка успешно добавлена!
				</MuiAlert>
			</Snackbar>
		</>
	)
}
