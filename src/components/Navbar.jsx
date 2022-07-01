import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Button } from './Button';


function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick= () => setClick(!click);
  const closeMobileMenu= () => setClick(false);
  return (
    <>
        <nav classname="navbar">
        <FontAwesomeIcon icon="fa-solid fa-book" />
            <div class="navbar-container">
                <Link to="/" classname="navbar-logo">
                    Zoop
                    <FontAwesomeIcon icon={solid('user-secret')} />
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                  <FontAwesomeIcon icon={click ? solid('xmark') : solid('bars')}/>
                </div>
                <ul className='nav-item'>
                  <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/tomatosauce' className='nav-links' onClick={closeMobileMenu}>
                      Tomato Sauce
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/bumblebee' className='nav-links' onClick={closeMobileMenu}>
                      Bumble Bee
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/signup' className='nav-links' onClick={closeMobileMenu}>
                      <Button/>Sign Up
                    </Link>
                  </li>
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Navbar