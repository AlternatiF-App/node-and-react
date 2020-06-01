import React, {useState,  useEffect} from 'react'
import {Link, useHistory} from  'react-router-dom'
import M from 'materialize-css'

const Register = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)

    useEffect(() => {
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic = () =>  {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "fanani-apps")
        fetch('https://api.cloudinary.com/v1_1/fanani-apps/image/upload', {
            method:"post",
            body:data
        })
        .then(res => res.json())
        .then(data => {
            setUrl(data.url)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const uploadFields = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid email!", classes:"#c62828 red darken-3"})
            return
        }
        fetch("/api/register", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                phone,
                email,
                password,
                photo:url
            })
        }).then(res=>res.json())
        .then(data => {
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }else{
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
                history.push('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const PostData = () => {
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
    }


    return(
        <div className="container">
            <p className="text-title">Register</p>
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
    
                     <div className="file-field input-field">
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Upload</span>
                            <input 
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>

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
        </div>
    )
}

export default Register