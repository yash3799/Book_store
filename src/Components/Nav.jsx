import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import { useGlobalContext } from '../context/userContext';
import { useCartContext } from '../context/cart';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';

export default function Nav() {
  const userinfo = useGlobalContext();
  const cartContext = useCartContext();
  const userdelete=()=>{
    userinfo.user_logout();
    cartContext.updateCart([]);
}
  // console.log(userinfo.userLogin)
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          BOOK APP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active">HOME</Link>
            </li>
          </ul>
          <div className="d-flex justify-content-end">
            {userinfo.userLogin === true ?
              <div className="d-flex justify-content-start">
                <div className='m-2'>
                  <Link to="/cart" className="nav-link active">
                    <ShoppingCartTwoToneIcon fontSize='large' />
                  </Link>
                </div>
                <div className='m-2'>
                  <Link to="/account" className="nav-link active">
                    <PersonIcon fontSize="large" />
                  </Link>
                </div>
                <div className='m-2'>
                  <LogoutIcon onClick={userdelete}/>
                </div>
              </div>
              :
              <div className="d-flex justify-content-start">
                <div className='m-2'>
                  <Link to="/cart" className="nav-link active">
                    <ShoppingCartTwoToneIcon fontSize='large' />
                  </Link>
                </div>
                <div className='m-2'>
                  <button type="button" className="btn btn-dark me-md-2">
                    <Link to="/signin" className="nav-link active" >SIGN IN</Link>
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>

  )
}
