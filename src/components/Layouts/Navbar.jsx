import {  useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../assets/shopping_logo.png';

const Navbar = () => {

  const cartItems = useSelector((state) => state.cart.items)

  return (
    <>
    <div className='navbar py-3 px-5'>
        <Link className="text-white" to='/'>
          <img src={logo} alt="logo" className='img-fluid' />
        </Link>

        <div className='navbar-list text-white'>
            <Link className="navLink text-white" to='/'>Home</Link>
            <Link className="navLink text-white" to='/cart'>Cart {cartItems?.length}</Link>
            <Link className="navLink text-white" to='/register'>Register</Link>
        </div>
    </div>
    </>
  )
}

export default Navbar