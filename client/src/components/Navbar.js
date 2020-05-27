import React from 'react'
import "../App.css"
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper white">
            <Link to="/" className="brand-logo left">Fanani Apps</Link>
            <ul id="nav-mobile" className="right">
                <li><Link to="/login" className="nav-menu">Logout</Link></li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar;