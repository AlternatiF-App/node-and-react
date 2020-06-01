import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import "../App.css"

const Navbar = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    return (
        <nav>
            <div className="nav-wrapper white">
            <Link to="/" className="brand-logo left">Fanani Apps</Link>
            <ul id="nav-mobile" className="right">
            <li>
                    <button className="btn #c62828 red darken-3"
                        onClick={() => {
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            history.push('/login')
                        }}
                    >
                        Logout
                    </button>
                </li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar;