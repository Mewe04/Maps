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
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

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

	const handleDescriptionChange = value => {
		setDescription(value)
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
			<Dialog
				open={openAddDialog}
				onClose={ExitDialog}
				PaperProps={{ style: { height: '70vh', width: '70vh' } }}
			>
				<DialogTitle>Добавление метки</DialogTitle>
				<DialogContent>
					<TextField
						label='Заголовок'
						value={title}
						onChange={handleTitleChange}
						style={{ width: '100%', marginTop: 5, marginBottom: 5 }}
					/>
					<ReactQuill
						value={description}
						onChange={handleDescriptionChange}
						style={{ height: '75%' }}
						modules={{
							toolbar: [
								[{ header: '1' }, { header: '2' }, { font: [] }],
								[{ size: [] }],
								['bold', 'italic', 'underline', 'strike'],
								[{ list: 'ordered' }, { list: 'bullet' }],
								['clean'],
							],
							clipboard: {
								matchVisual: false,
							},
						}}
						formats={[
							'header',
							'font',
							'size',
							'bold',
							'italic',
							'underline',
							'strike',
							'list',
							'bullet',
						]}
						theme='snow'
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
