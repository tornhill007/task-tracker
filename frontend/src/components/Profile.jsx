import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import classes from "./Header/Header.module.css";

const Profile = (props) => {
    if (!props.token) {
        return <Redirect to='/login'/>
    } else return <div className="App">
        <div className={classes.wrapProfile}>
            <div title={props.userName} className={classes.containerIconProfile}><span
                className={classes.wrapIconProfile}>{props.userName.substr(0, 1)}</span></div>
            <div className={classes.profileName}>{props.userName}</div>
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    userName: state.auth.userName,
    token: state.auth.token
})

export default connect(mapStateToProps, {})(Profile);