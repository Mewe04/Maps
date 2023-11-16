import { initializeApp } from 'firebase/app'
import {
	getDatabase,
	onValue,
	push,
	ref,
	remove,
	set,
	update,
} from 'firebase/database'

const firebaseConfig = {
	apiKey: 'AIzaSyA7a7xTH2hFrUc7j43IkT7LyutOfNaLC6Y',
	authDomain: 'mapweb-72d2d.firebaseapp.com',
	databaseURL: 'https://mapweb-72d2d-default-rtdb.firebaseio.com',
	projectId: 'mapweb-72d2d',
	storageBucket: 'mapweb-72d2d.appspot.com',
	messagingSenderId: '1041737540037',
	appId: '1:1041737540037:web:ebb2e0d2c7dc364ee82bac',
	measurementId: 'G-KM0RF23XLK',
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getDatabase(firebaseApp)

export { db, onValue, push, ref, remove, set, update }
