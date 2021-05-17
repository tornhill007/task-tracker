import React from 'react';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const Profile = (props) => {
    if(!props.token) {
        return <Redirect to='/login'/>
    }  else return <div className="App">
        <div>My Profile</div>
        <div>{props.userName}</div>
    </div>
}
// let AuthRedirectComponent = withAuthRedirect(Profile);

const mapStateToProps = (state) => ({
    userName: state.auth.userName,
    token: state.auth.token
})

export default connect(mapStateToProps, {})(Profile);