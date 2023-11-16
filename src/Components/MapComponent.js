import { Paper } from '@mui/material'
import { divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React from 'react'
import { Marker as LeafletMarker, MapContainer, TileLayer } from 'react-leaflet'

const icon = divIcon({
	className: 'custom-icon',
	iconSize: [38, 38],
	iconAnchor: [19, 38],
	html: `<img src="./marker.png" style="width: 100%; height: 100%;" />`,
})

const initialPosition = [51.505, -0.09]

function MapComponent({ setSelectedMarker, markers, MapClickHandler }) {
	return (
		<>
			<Paper elevation={3} style={{ height: '100%' }}>
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
					{markers.map(marker => (
						<LeafletMarker
							key={marker.id}
							position={marker.position}
							icon={icon}
							eventHandlers={{
								click: () => {
									setSelectedMarker(marker)
								},
							}}
						/>
					))}
					<MapClickHandler />
				</MapContainer>
			</Paper>
		</>
	)
}

export default MapComponent
