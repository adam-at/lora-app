import React, { useState } from 'react';
import {Link} from 'react-router-dom'

function Navbar() {
  const [click, setClick] = useState(false);
  return (
    <>
        <nav classname="navbar">
            <div class="navbar-container">
                <Link to="/" classname="navbar-logo">
                    TRVL <i class="fa fa-address-book"></i>
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