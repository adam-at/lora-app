import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'


function Navbar() {
  const [click, setClick] = useState(false);

  return (
    <>
        <nav classname="navbar">
        <FontAwesomeIcon icon="fa-solid fa-book" />
            <div class="navbar-container">
                <Link to="/" classname="navbar-logo">
                    Zoop <FontAwesomeIcon icon={faCoffee} />
                    <FontAwesomeIcon icon={solid('user-secret')} />
                    <FontAwesomeIcon icon={regular('coffee')} />
                    <FontAwesomeIcon icon={brands('twitter')} />
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