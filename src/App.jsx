import { useState } from 'react'
import AllRoutes from './Routes/AllRoutes'
import './App.css'
import Navbar from './components/Layouts/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';


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
