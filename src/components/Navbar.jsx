import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Button } from './Button';
import './Navbar.css'


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick= () => setClick(!click);
  const closeMobileMenu= () => setClick(false);
  const showButton = () => {
    if(window.innerWidth <= 960){
      setButton(false);
    } else{
      setButton(true);
    }
  };

  useEffect(() => {
    showButton()
  }, [])

  window.onload=function(){
  const body = document.querySelector('body'),
  sidebar = body.querySelector('nav'),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

  toggle.addEventListener("click" , () =>{
  sidebar.classList.toggle("close");
})

  searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
  })

  modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
  });

}

  window.addEventListener('resize', showButton);
  return (
    <>
       <nav class="sidebar close">
        <header>
            <div class="image-text">
                <span class="image">
                <FontAwesomeIcon icon={solid("tower-broadcast")} class="icon"></FontAwesomeIcon>
                </span>

                <div class="text logo-text">
                    <span class="name">MyCS</span>
                    <span class="profession">Welcome !</span>
                </div>
            </div>

            <i class='bx bx-chevron-right toggle'></i>
        </header>

        <div class="menu-bar">
            <div class="menu">

                <li class="search-box">
                  <FontAwesomeIcon icon={solid("magnifying-glass")} class="ficon"></FontAwesomeIcon>
                    <input type="text" placeholder="Search..." />
                </li>

                <ul class="menu-links">
                    <li class="nav-link">
                        <a href="#">
                            <FontAwesomeIcon icon={solid("house")} class="ficon"></FontAwesomeIcon>
                            <span class="text nav-text">Dashboard</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                        <FontAwesomeIcon icon={solid("server")} class="ficon"></FontAwesomeIcon>
                            <span class="text nav-text">Network Servers</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                            <FontAwesomeIcon icon={solid("tower-cell")} class="ficon"></FontAwesomeIcon>
                            <span class="text nav-text">Gateway Profiles</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                            <FontAwesomeIcon icon={solid("landmark")} class="ficon"/>
                            <span class="text nav-text">Organizations</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                            <FontAwesomeIcon icon={solid("users")} class="ficon"/>
                            <span class="text nav-text">All Users</span>
                        </a>
                    </li>

                    <li class="nav-link">
                        <a href="#">
                            <FontAwesomeIcon icon={solid("key")} class="ficon"/>
                            <span class="text nav-text">API Keys</span>
                        </a>
                    </li>

                </ul>
            </div>

            <div class="bottom-content">
                <li class="">
                    <a href="#">
                        <FontAwesomeIcon icon={solid("user-pen")} class="ficon"/>
                        <span class="text nav-text">Account</span>
                    </a>
                </li>
                <li class="">
                    <a href="#">
                        <i class='bx bx-log-out icon' ></i>
                        <span class="text nav-text">Logout</span>
                    </a>
                </li>

                <li class="mode">
                    <div class="sun-moon">
                        <i class='bx bx-moon icon moon'></i>
                        <i class='bx bx-sun icon sun'></i>
                    </div>
                    <span class="mode-text text">Dark mode</span>

                    <div class="toggle-switch">
                        <span class="switch"></span>
                    </div>
                </li>
                
            </div>
        </div>

    </nav>


    <script>
      
    </script>

    </>
  );
}
export default Navbar