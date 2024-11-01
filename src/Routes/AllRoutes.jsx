import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Category from '../pages/Category'
import { ProductPage } from '../pages/ProductPage'
import Register from '../pages/Register'
import Login from '../pages/Login'

function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/category/:id' element={<Category/>} />
            <Route path='/products/:id' element={<ProductPage/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes