import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Category from '../pages/Category'

function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/category/:id' element={<Category/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes