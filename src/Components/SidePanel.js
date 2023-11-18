import { Button, Grid, Paper, Snackbar, Typography } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import React, { useEffect, useState } from 'react'
import './SidePanel.css'

function SidePanel({ selectedMarker }) {
	const [isContentVisible, setIsContentVisible] = useState(false)
	const [purchasedInfo, setPurchasedInfo] = useState({})
	const [openSnackbar, setOpenSnackbar] = useState(false)

	useEffect(() => {
		setIsContentVisible(false)
		setTimeout(() => {
			setIsContentVisible(true)
		}, 50)
	}, [selectedMarker])

	const handlePurchaseClick = () => {
		setPurchasedInfo(prevState => ({
			...prevState,
			[selectedMarker.id]: true,
		}))

		setOpenSnackbar(true)
	}

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpenSnackbar(false)
	}

	return (
		<Grid
			item
			xs={12}
			md={3}
			sx={{
				pt: 2,
				paddingLeft: 2,
				height: '100%',
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Paper elevation={3} sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
				{selectedMarker && (
					<>
						<Typography variant='h6'>{selectedMarker.title}</Typography>
						<Typography variant='body1'>Описание:</Typography>
						{purchasedInfo[selectedMarker.id] ? (
							<>
								<div
									dangerouslySetInnerHTML={{
										__html: selectedMarker.description,
									}}
								/>
							</>
						) : (
							<>
								<Typography variant='h6'>Купите информацию</Typography>
								<Button variant='contained' onClick={handlePurchaseClick}>
									Купить
								</Button>
							</>
						)}
					</>
				)}
			</Paper>
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
					Покупка прошла успешно!
				</MuiAlert>
			</Snackbar>
		</Grid>
	)
}

export default SidePanel
