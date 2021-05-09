import React from 'react';
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/reducers/authReducer";


const Header = (props) => {

    const onLogout = () => {
        props.setAuthUserData(null, null, null);
        window.localStorage.removeItem('user');
    }


    return (
        <header className={`${classes.header} ${props.isTaskInfo && classes.map}`}>
            Header
            {props.token ? <div>{props.userName} - <button onClick={() => {
                    onLogout()
                }}>Log out</button></div> :
                <>
                    <div><NavLink to="/login" activeClassName={classes.activeLink}>Sign in</NavLink></div>
                    <div><NavLink to="/register" activeClassName={classes.activeLink}>Sign up</NavLink></div>
                </>
            }


            {/*<img src="https://forklog.com/wp-content/uploads/social-network1.jpg" alt="emblem"/>*/}
            {/*<div className={classes.loginBlock}>*/}
            {/*    {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> : <NavLink to={'/login'}>*/}
            {/*        Login*/}
            {/*    </NavLink>}*/}
            {/*</div>*/}
        </header>
    );
};

const mapStateToProps = (state) => ({
    isTaskInfo: state.columnsPage.isTaskInfo
})

export default connect(mapStateToProps, {setAuthUserData})(Header);