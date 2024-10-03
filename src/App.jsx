import { useState } from 'react'
import AllRoutes from './Routes/AllRoutes'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  const [count, setCount] = useState(0)
  return (
    <>
        <Navbar/>
        <AllRoutes/>
    </>
  )
}

export default App
