import React from 'react';
import { NavLink, Link } from 'react-router-dom';
// import Popup from 'reactjs-popup';
import '../styles/header.css';
// import RouteForm from '../pages/RouteForm';

export default function Header() {
  return (
    <div>
        <header className = 'header_container'>
            <Link to = '/router_form' style={{textDecoration: 'none'}}>
                <button className='trigger_button' >
                    Create Route
                </button>
            </Link>

            {/* <Popup
                trigger={<button className='trigger_button' style = {{}} >
                    Create Route
                </button>}
                modal
                nested
                >
                {close => (
                    <div className = 'popup_layout'>
                        <RouteForm close={close} /> 
                    </div>
                
                )}
            </Popup> */}
        </header>
    </div>
  )
}
