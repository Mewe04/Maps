import { ThemeProvider, createTheme } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#5893df',
		},
		secondary: {
			main: '#2ec5d3',
		},
		background: {
			default: '#192231',
			paper: '#24344d',
		},
	},
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
)
