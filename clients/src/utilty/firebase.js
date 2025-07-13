import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAewcnsDad31bFAVNrgMjTjS_JvA5k8QKU',
  authDomain: 'e-clone-a50da.firebaseapp.com',
  projectId: 'e-clone-a50da',
  storageBucket: 'e-clone-a50da.appspot.com',
  messagingSenderId: '924642048335',
  appId: '1:924642048335:web:2651e749d0cb839d1b2d3a',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
