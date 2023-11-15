// Ваш App.js
import {
	Button,
	CssBaseline,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	TextField,
} from '@mui/material'
import React, { useState } from 'react'
import './App.css'
import AppBarComponent from './Components/AppBarComponent'
import MapComponent from './Components/MapComponent'
import SidePanel from './Components/SidePanel'

function App() {
	const [selectedMarker, setSelectedMarker] = useState(null)
	const [markers, setMarkers] = useState([
		{
			id: 1,
			position: [51.505, -0.09],
			title: 'Метка 1',
			description: 'Описание метки 1',
		},
		{
			id: 2,
			position: [51.51, -0.1],
			title: 'Метка 2',
			description: 'Описание метки 2',
		},
	])

	const [editedTitle, setEditedTitle] = useState('')
	const [editedDescription, setEditedDescription] = useState('')

	const handleTitleChange = event => {
		setEditedTitle(event.target.value)
	}

	const handleDescriptionChange = event => {
		setEditedDescription(event.target.value)
	}

	const [isEditing, setIsEditing] = useState(false)

	const [openEditDialog, setOpenEditDialog] = useState(false)
	const [openAddDialog, setOpenAddDialog] = useState(false)

	const handleMarkerClick = marker => {
		setSelectedMarker(marker)

		if (isEditing) {
			setEditedTitle(marker?.title || '') // Используйте ?. для безопасного доступа к свойству
			setEditedDescription(marker?.description || '')
			setOpenEditDialog(true)
		}
	}

	const handleMapClick = () => {
		setSelectedMarker(null)
		if (isEditing) {
			setOpenAddDialog(true) // Открываем окно добавления
		}
	}

	return (
		<div style={{ height: '100vh' }}>
			<CssBaseline />
			<AppBarComponent isEditing={isEditing} setIsEditing={setIsEditing} />
			<Grid container style={{ height: '90%' }}>
				<SidePanel selectedMarker={selectedMarker} markers={markers} />
				<Grid item xs={12} md={9} sx={{ flexGrow: 1, p: 2 }}>
					<MapComponent
						setSelectedMarker={handleMarkerClick}
						markers={markers}
						onMapClick={handleMapClick}
						isEditing={isEditing}
					/>
				</Grid>
			</Grid>
			<Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
				<DialogTitle>Редактирование метки</DialogTitle>
				<DialogContent>
					{selectedMarker && (
						<>
							<TextField
								label='Заголовок'
								defaultValue={selectedMarker.title || ''}
								onChange={handleTitleChange}
							/>
							<TextField
								label='Описание'
								defaultValue={selectedMarker.description || ''}
								onChange={handleDescriptionChange}
							/>
						</>
					)}
				</DialogContent>

				<DialogActions>
					{selectedMarker && (
						<>
							<Button>Удалить</Button>
							<Button>Сохранить</Button>
						</>
					)}
					<Button onClick={() => setOpenEditDialog(false)}>Закрыть</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
				<DialogTitle>Добавление метки</DialogTitle>
				<DialogContent>
					<TextField label='Заголовок' onChange={handleTitleChange} />
					<TextField label='Описание' onChange={handleDescriptionChange} />
				</DialogContent>
				<DialogActions>
					<Button>Добавить</Button>
					<Button onClick={() => setOpenAddDialog(false)}>Закрыть</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default App
