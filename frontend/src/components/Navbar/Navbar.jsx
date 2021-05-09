import React from 'react';
import classes from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";


const Navbar = (props) => {
    return (
        <nav className= { `${classes.nav} ${props.isTaskInfo && classes.map}`  }>
            <div><NavLink to="/profile" activeClassName={classes.activeLink}>My Profile</NavLink></div>
            <div><NavLink to="/projects" activeClassName={classes.activeLink}>My Projects</NavLink></div>
        </nav>
    );
}

const mapStateToProps = (state) => ({
    isTaskInfo: state.columnsPage.isTaskInfo
})

export default connect(mapStateToProps, {})(Navbar);