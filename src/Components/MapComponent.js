import { Paper } from '@mui/material'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

const icon = L.icon({
	iconUrl: 'marker.png',
	iconSize: [38, 38],
})

const initialPosition = [51.505, -0.09]

function MapComponent({ setSelectedMarker, markers, onMapClick, isEditing }) {
	return (
		<>
			<Paper elevation={3} style={{ height: '100%' }} onClick={onMapClick}>
				<MapContainer
					center={initialPosition}
					zoom={13}
					scrollWheelZoom={true}
					style={{ width: '100%', height: '100%' }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					{markers.map((marker, index) => (
						<Marker
							key={index}
							position={marker.position}
							icon={icon}
							eventHandlers={{
								click: e => {
									e.originalEvent.stopPropagation()
									setSelectedMarker(marker)
								},
							}}
						/>
					))}
				</MapContainer>
			</Paper>
		</>
	)
}

export default MapComponent
