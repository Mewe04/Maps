import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function EditDialog({
	openEditDialog,
	setOpenEditDialog,
	selectedMarker,
	updateMarker,
	deleteMarker,
}) {
	const [editedTitle, setEditedTitle] = useState('')
	const [editedDescription, setEditedDescription] = useState('')

	useEffect(() => {
		// Set initial values when selectedMarker changes
		setEditedTitle(selectedMarker?.title || '')
		setEditedDescription(selectedMarker?.description || '')
	}, [selectedMarker])

	const handleTitleChange = event => {
		setEditedTitle(event.target.value)
	}

	const handleDescriptionChange = event => {
		setEditedDescription(event.target.value)
	}

	const handleSaveChanges = () => {
		// Call the updateMarker function from the parent component
		updateMarker(selectedMarker.id, editedTitle, editedDescription)
		setOpenEditDialog(false)
	}

	const handleDeleteMarker = () => {
		// Call the deleteMarker function from the parent component
		deleteMarker(selectedMarker.id)
		setOpenEditDialog(false)
	}

	return (
		<Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
			<DialogTitle>Редактирование метки</DialogTitle>
			<DialogContent>
				{selectedMarker && (
					<>
						<TextField
							label='Заголовок'
							value={editedTitle}
							onChange={handleTitleChange}
						/>
						<TextField
							label='Описание'
							value={editedDescription}
							onChange={handleDescriptionChange}
						/>
					</>
				)}
			</DialogContent>

			<DialogActions>
				{selectedMarker && (
					<>
						<Button onClick={handleDeleteMarker}>Удалить</Button>
						<Button onClick={handleSaveChanges}>Сохранить</Button>
					</>
				)}
				<Button onClick={() => setOpenEditDialog(false)}>Закрыть</Button>
			</DialogActions>
		</Dialog>
	)
}
