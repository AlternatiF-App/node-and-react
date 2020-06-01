import React, {useEffect, useState, useContext, Component} from 'react'
import {UserContext} from  '../../App'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Home = () =>  {

    const [showSummary,  setSum] = useState(true)
    const [showProfile,  setPro] = useState(false)
    const [showPortofolio,  setPor] = useState(false)
    
    const toggleSummary = () => setSum(true) || setPro(false) || setPor(false)
    const toggleProfile = () => setSum(false) || setPro(true) || setPor(false)
    const togglePortofolio = () => setSum(false) || setPro(false) || setPor(true)

    const [mypics, setPics] = useState([])
    const {state, dispatch} = useContext(UserContext)

    return(
        <div style={{
            maxWidth:"550px",
            margin:"0px auto"
        }}>
            <div
                style={{
                    margin:"18px 0px",
                    borderBottom:"1px solid  grey"
                }}
            >
                <div style={{
                    display:"flex",
                    justifyContent:"space-around"
                }}>
                    <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px", objectFit:"cover"}}
                            src={state?state.photo:"Loading"}
                        />
                    </div>
                    <div>
                        <h4>{state?state.name:"Loading..."}</h4>
                        <h5>{state?state.email:"Loading..."}</h5>
                        <h5>{state?state.phone:"Loading..."}</h5>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <div className="container-menu">
                    <ul>
                        <li><a onClick={toggleSummary}>Summary</a></li>
                        <li><a onClick={toggleProfile}>Profile</a></li>
                        <li><a onClick={togglePortofolio}>Portofolio</a></li>
                    </ul>
                </div>
                <div>
                    { showSummary ? <Summary /> : null}
                    { showProfile ? <Profile /> : null}
                    { showPortofolio ? <Portofolio /> : null}
                </div>
            </div>
        </div>
    )
}

const Summary = () => {
    return(
        <div>
            <h1>Summary</h1>
        </div>
    )
}

const Profile = () => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()

    const updateUser = (_id) => {
        if(image){
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "fanani-apps")
            fetch("https://api.cloudinary.com/v1_1/fanani-apps/image/upload", {
                method:"post",
                body:data
            })
            .then(res => res.json())
            .then(data => {
                fetch(`/api/updateuser/${state._id}`, {
                    method:"put",
                    headers:{
                        "Authorization":"Bearer "+localStorage.getItem("jwt"),
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        name,
                        password,
                        photo:data.url
                    })
                }).then(res => res.json())
                .then(result => {
                    console.log(result)
                    if(result.error){
                        console.log(result.error)
                    }else{
                        console.log(result.message)
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/login')
                    }
                }).catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const upNoImage = (_id) => {
        fetch(`/api/updateuser/${state._id}`, {
            method:"put",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                photo:state.photo
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            if(result.error){
                console.log(result.error)
            }else{
                console.log(result.message)
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const postUpdate = () => {
        if(image){
            updateUser()
        }else{
            upNoImage()
        }
    }

    return(
        <div className="profile-container">
            <div className="comp-edit">
                <h6 className="text-edit">Edit Password</h6>
                <input
                    type="password"
                    className="input-edit"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="comp-edit">
                <h6 className="text-edit">Edit Name</h6>
                <input
                    type="text"
                    className="input-edit"
                    placeholder="Password"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

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
                className="btn-auth"
                onClick={() =>postUpdate()}
                >
                    Update
            </button>
        </div>
    )
}

const Portofolio = () => {
    return(
        <div>
            <h1>Portofolio</h1>
        </div>
    )
}

export default Home