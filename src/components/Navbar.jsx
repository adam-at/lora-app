import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';


function Navbar() {

  window.onload=function(){
  const body = document.querySelector('body'),
  sidebar = body.querySelector('nav'),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

  if(toggle){
  toggle.addEventListener("click" , () =>{
  sidebar.classList.toggle("close");
})
  }
  if(searchBtn){
  searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
  })
  }

  if(modeSwitch){
  modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
  });
  }
}

const [search, setSearch] = useState("");
const navigate = useNavigate();

const handleSearch = () => {
    if(window.location.pathname.startsWith("/search")){
        navigate('/search?search='+search);
        window.location.reload();
    }else{
    navigate('/search?search='+search);
}
}


  return (
    <>
       <nav className="sidebar close">
        <header>
            <div className="image-text">
                <span className="image">
                <FontAwesomeIcon icon={solid("tower-broadcast")} className="icon"></FontAwesomeIcon>
                </span>

                <div className="text logo-text">
                    <span className="name">MyCS</span>
                    <span className="profession">Welcome !</span>
                </div>
            </div>

            <i className='bx bx-chevron-right toggle'></i>
        </header>

        <div className="menu-bar">
            <div className="menu">

                <li className="search-box">
                    <FontAwesomeIcon icon={solid("magnifying-glass")} className="ficon" onClick={handleSearch}></FontAwesomeIcon>
                    <input id="searchInput" type="search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                </li>

                <ul className="menu-links">
                    <li className="nav-link">
                        <a href="/dashboard">
                            <FontAwesomeIcon icon={solid("house")} className="ficon"></FontAwesomeIcon>
                            <span className="text nav-text">Dashboard</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="/network-servers">
                        <FontAwesomeIcon icon={solid("server")} className="ficon"></FontAwesomeIcon>
                            <span className="text nav-text">Network Servers</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="/gateway-profiles">
                            <FontAwesomeIcon icon={solid("tower-cell")} className="ficon"></FontAwesomeIcon>
                            <span className="text nav-text">Gateway Profiles</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="/organizations">
                            <FontAwesomeIcon icon={solid("landmark")} className="ficon"/>
                            <span className="text nav-text">Organizations</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="/users">
                            <FontAwesomeIcon icon={solid("users")} className="ficon"/>
                            <span className="text nav-text">All Users</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="/api-keys">
                            <FontAwesomeIcon icon={solid("key")} className="ficon"/>
                            <span className="text nav-text">API Keys</span>
                        </a>
                    </li>

                </ul>
            </div>

            <div className="bottom-content">
                <li className="">
                    <a href="/password">
                        <FontAwesomeIcon icon={solid("user-pen")} className="ficon"/>
                        <span className="text nav-text">Change Password</span>
                    </a>
                </li>
                <li className="">
                    <a href="#">
                        <i className='bx bx-log-out icon' ></i>
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>

                <li className="mode">
                    <div className="sun-moon">
                        <i className='bx bx-moon icon moon'></i>
                        <i className='bx bx-sun icon sun'></i>
                    </div>
                    <span className="mode-text text">Dark mode</span>

                    <div className="toggle-switch">
                        <span className="switch"></span>
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