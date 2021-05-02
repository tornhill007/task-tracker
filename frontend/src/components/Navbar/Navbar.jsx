import React from 'react';
import classes from './Navbar.module.css'
import {NavLink} from "react-router-dom";
console.log(classes);

const Navbar = () => {
    return (
        <nav className= { classes.nav }>
            <div><NavLink to="/profile" activeClassName={classes.activeLink}>My Profile</NavLink></div>
            <div><NavLink to="/projects" activeClassName={classes.activeLink}>My Projects</NavLink></div>
        </nav>
    );
}

export default Navbar;