import React, {useState} from 'react'
import {Link} from  'react-router-dom'

const Register = () => {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const PostData = () => {
        fetch('http://localhost:5000/register', {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:"",
                phone:"",
                email:"",
                password:""
            })
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
        })
    }


    return(
        <div className="container">
            <p className="text-title">Register</p>
            <form>
                <label>Name</label>
                <input 
                    type="text"
                    className="form_login" 
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                    -
                <label>Email</label>
                <input 
                    type="text"
                    className="form_login" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>

                <label>Phone</label>
                <input 
                    type="text"
                    className="form_login" 
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}/>
        
                <label>Password</label>
                <input 
                    type="password"
                    className="form_login"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
        
                <button 
                    onClick={() => PostData()}
                    className="btn-auth">
                        Register
                </button>
        
                <br/>
                <br/>
                <center>
                    <Link className="link" to="/login">Already have account?</Link>
                </center>
            </form>
        </div>
    )
}

export default Register