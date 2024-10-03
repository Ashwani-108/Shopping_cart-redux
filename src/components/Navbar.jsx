import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {

  const cartItems = useSelector((state) => state.cart.items)
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <>
    <div style={{display:'flex',alignItems:'space-between'}}>
        <span onClick={() => handleNavigate()}>Redux Store</span>
        <div>
            <Link className="navLink" to='/'>Home</Link>
            <Link className="navLink" to='/cart'>Cart</Link>
            <span className='cartCount'>
                Cart Items:{cartItems?.length}    
            </span>
        </div>
    </div>
    </>
  )
}

export default Navbar