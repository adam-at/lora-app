import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar() {
  const [click, setClick] = useState(false);
  return (
    <>
        <nav classname="navbar">
        <FontAwesomeIcon icon="fa-solid fa-book" />
            <div class="navbar-container">
                <Link to="/" classname="navbar-logo">
                    TRV
                    <FontAwesomeIcon icon="fa-solid fa-book"/>
                </Link>
                <div className="menu-icon">
                  <i className={click ? 'fas fa-alarm-plus' : 'fas fa-alarm-exclamation'}/>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar