import React, {useContext, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Login = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email!", classes:"#c62828 red darken-3"})
            return
        }
        fetch("/api/login", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data => {
            // console.log(data)
            if(data.err){
                M.toast({html: data.err, classes:"#c62828 red darken-3"})
            }else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html: "SignIn Successfully!", classes:"#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="container">
            <p className="text-title">Login</p>
                <label>Email</label>
                <input 
                    type="text"
                    className="form_login" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
        
                <label>Password</label>
                <input 
                    type="password"
                    className="form_login"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
        
                <button 
                    className="btn-auth"
                    onClick={() => PostData()}>
                        Login
                </button>
        
                <br/>
                <br/>
                <center>
                    <Link className="link" to="/register">Don't have account?</Link>
                </center>
        </div>
    )
}

export default Login