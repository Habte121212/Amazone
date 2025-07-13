import './App.css'
import Router from '../Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={2500} />
      <Router />
    </>
  )
}

export default App
