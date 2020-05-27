import React, {Component} from 'react'



class Home extends Component{

    constructor(props){
        super(props)
        this.state = {showSummary : true}
        this.state = {showProfile : true}
        this.state = {showPortofolio : true}
        this.toggleSummary = this.toggleSummary.bind(this)
        this.toggleProfile = this.toggleProfile.bind(this)
        this.togglePortofolio = this.togglePortofolio.bind(this)
    }

    toggleSummary = () => {
        const {showSummary} = this.state
        const {showProfile} = this.state
        const {showPortofolio} = this.state
        this.setState({showSummary : true})
        this.setState({showProfile : false})
        this.setState({showPortofolio : false})
    }
    toggleProfile = () => {
        const {showSummary} = this.state
        const {showProfile} = this.state
        const {showPortofolio} = this.state
        this.setState({showSummary : false})
        this.setState({showProfile : true})
        this.setState({showPortofolio : false})
    }
    togglePortofolio = () => {
        const {showSummary} = this.state
        const {showProfile} = this.state
        const {showPortofolio} = this.state
        this.setState({showSummary : false})
        this.setState({showProfile : false})
        this.setState({showPortofolio : true})
    }

    render(){
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
                            <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                                src="https://s.kaskus.id/r540x540/images/2020/02/18/10763050_202002181235030107.png"
                            />
                        </div>
                        <div>
                            <h4>Ria SW</h4>
                            <h5>riasukmawijaya@gmail.com</h5>
                            <h5>082142931584</h5>
                        </div>
                    </div>
                </div>
                <div className="gallery">
                    <div className="container-menu">
                        <ul>
                            <li><a onClick={this.toggleSummary}>Summary</a></li>
                            <li><a onClick={this.toggleProfile}>Profile</a></li>
                            <li><a onClick={this.togglePortofolio}>Portofolio</a></li>
                        </ul>
                    </div>
                    <div>
                        {this.state.showSummary && <Summary/> }
                        {this.state.showProfile && <Profile/> }
                        {this.state.showPortofolio && <Portofolio/> }
                    </div>
                </div>
            </div>
        )
    }
}

class Summary extends Component  {
    render(){
        return(
            <div>
                <h1>Summary</h1>
            </div>
        )
    }
}
class Profile extends Component  {
    render(){
        return(
            <div className="profile-container">
                <div className="comp-edit">
                    <h6 className="text-edit">Edit Password</h6>
                    <input
                        type="password"
                        className="input-edit"
                        placeholder="Password"
                    />
                </div>
                <div className="comp-edit">
                    <h6 className="text-edit">Edit Name</h6>
                    <input
                        type="text"
                        className="input-edit"
                        placeholder="Password"
                    />
                </div>
            </div>
        )
    }
}
class Portofolio extends Component  {
    render(){
        return(
            <div>
                <h1>Portofolio</h1>
            </div>
        )
    }
}

export default Home