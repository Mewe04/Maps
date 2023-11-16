// App.js
import { CssBaseline, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMapEvents } from 'react-leaflet'
import './App.css'
import AddDialog from './Components/AddDialog'
import AppBarComponent from './Components/AppBarComponent'
import EditDialog from './Components/EditDialog'
import MapComponent from './Components/MapComponent'
import SidePanel from './Components/SidePanel'
import {
	db,
	onValue,
	push,
	ref,
	remove,
	set,
	update,
} from './Components/firebase' // Updated import statement

function App() {
	const [selectedMarker, setSelectedMarker] = useState(null)

	const [markers, setMarkers] = useState([])

	useEffect(() => {
		const markersRef = ref(db, 'markers')
		onValue(markersRef, snapshot => {
			const data = snapshot.val()
			if (data) {
				const markersList = Object.keys(data).map(key => ({
					id: key,
					...data[key],
				}))
				setMarkers(markersList)
			}
		})
	}, [])

	const [isEditing, setIsEditing] = useState(false)

	const [openEditDialog, setOpenEditDialog] = useState(false)
	const [openAddDialog, setOpenAddDialog] = useState(false)

	const handleMarkerClick = marker => {
		setSelectedMarker(marker)

		if (isEditing) {
			setOpenEditDialog(true)
		}
	}

	const [addLatLng, setAddLatLng] = useState(null)

	function MapClickHandler() {
		const map = useMapEvents({
			click: event => {
				const { lat, lng } = event.latlng
				console.log(`Координаты: ${lat}, ${lng}`)
				setSelectedMarker(null)
				if (isEditing) {
					setAddLatLng(event.latlng)
					setOpenAddDialog(true)
				}
			},
		})
		return null
	}

	const addMarker = async (position, title, description) => {
		const newMarkerRef = push(ref(db, 'markers'))
		const newMarker = {
			id: newMarkerRef.key,
			position,
			title,
			description,
		}

		await set(newMarkerRef, newMarker)
		setMarkers([...markers, newMarker])
	}

	const updateMarker = async (id, title, description) => {
		const markerRef = ref(db, `markers/${id}`)
		await update(markerRef, { title, description })

		const updatedMarkers = markers.map(marker =>
			marker.id === id ? { ...marker, title, description } : marker
		)

		setMarkers(updatedMarkers)
		setSelectedMarker(null)
	}

	const deleteMarker = async id => {
		const markerRef = ref(db, `markers/${id}`)
		await remove(markerRef)

		const updatedMarkers = markers.filter(marker => marker.id !== id)

		setMarkers(updatedMarkers)
		setSelectedMarker(null)
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
						MapClickHandler={MapClickHandler}
					/>
				</Grid>
			</Grid>
			<EditDialog
				openEditDialog={openEditDialog}
				setOpenEditDialog={setOpenEditDialog}
				selectedMarker={selectedMarker}
				updateMarker={updateMarker}
				deleteMarker={deleteMarker}
			/>
			<AddDialog
				openAddDialog={openAddDialog}
				setOpenAddDialog={setOpenAddDialog}
				addMarker={addMarker}
				addLatLng={addLatLng}
			/>
		</div>
	)
}

export default App
