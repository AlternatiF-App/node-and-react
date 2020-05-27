import React from 'react'
import {Link} from  'react-router-dom'

const Login = () => {
    return(
        <div className="container">
            <p className="text-title">Login</p>
            <form>
                <label>Email</label>
                <input 
                    type="text"
                    className="form_login" 
                    placeholder="Email"/>
        
                <label>Password</label>
                <input 
                    type="password"
                    className="form_login"
                    placeholder="Password"/>
        
                <button 
                    className="btn-auth">
                        Login
                </button>
        
                <br/>
                <br/>
                <center>
                    <Link className="link" to="/register">Don't have account?</Link>
                </center>
                <center>
                    <Link className="link" to="/">HOME</Link>
                </center>
            </form>
        </div>
    )
}

export default Login