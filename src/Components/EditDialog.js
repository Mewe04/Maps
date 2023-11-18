import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

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

	const handleDescriptionChange = value => {
		setEditedDescription(value)
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
		<Dialog
			open={openEditDialog}
			onClose={() => setOpenEditDialog(false)}
			PaperProps={{ style: { height: '70vh', width: '70vh' } }}
		>
			<DialogTitle>Редактирование метки</DialogTitle>
			<DialogContent>
				{selectedMarker && (
					<>
						<TextField
							label='Заголовок'
							value={editedTitle}
							onChange={handleTitleChange}
							style={{ width: '100%', marginTop: 5, marginBottom: 5 }}
						/>
						<ReactQuill
							value={editedDescription}
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
									// toggle to add extra line breaks when pasting HTML:
									matchVisual: false,
								},
							}}
							const
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
