import React, {useState} from 'react';
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/reducers/authReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faTimesCircle} from "@fortawesome/free-solid-svg-icons";


const Header = (props) => {

    const [isOpenUserList, setIsOpenUserList] = useState(false);

    const onLogout = () => {
        props.setAuthUserData(null, null, null);
        window.localStorage.removeItem('user');
    }


    // const onOpenUserMenu = (qwe) => {
    //     props.setIsOpenUserMenu
    // }


    // <div>{props.userName} - <div onClick={() => {
    //     onLogout()
    // }}>Log out</div></div>
    return (
        props.token ? <header className={`${classes.header} ${props.isTaskInfo && classes.map}`}>
                {isOpenUserList && <div className={classes.userMenuWrap}>
                    {/*<div className={classes.borderWrapTitle}>*/}
                    <div className={classes.borderItemTitle}>
                        <div><span>Account</span></div>
                        <div onClick={() => {setIsOpenUserList(false)}} className={classes.itenCloseItem}><FontAwesomeIcon icon={faTimes}/></div>
                    </div>
                    {/*</div>*/}

                    <div className={classes.wrapMenuLogin}>
                        <div className={classes.imgItem}><span onClick={() => {
                            setIsOpenUserList(true)
                        }} className={classes.wrapIconMain}>{props.userName.substr(0, 1)}</span></div>

                        <div className={classes.itemLoginName}>{props.userName}</div>
                    </div>
                    <div onClick={() => {onLogout()}} className={classes.itemLogout}>
                        <span>Log out</span>
                    </div>
                </div>}
                <div className={classes.itemCenter}>

                </div>
                <div className={`${classes.titleWrap} ${classes.itemLeft}`}>
                    Kanban board
                </div>
                <div className={classes.itemRight}>
                    {props.token ? <div className={classes.containerIconName}><span onClick={() => {
                            setIsOpenUserList(true)
                        }} className={classes.wrapIconName}>{props.userName.substr(0, 1)}</span></div> :
                        <div className={classes.wrapNavbars}>
                            <div><NavLink to="/login" className={classes.itemLogin} activeClassName={classes.activeLink}>Sign
                                in</NavLink></div>
                            <div><NavLink to="/register" className={classes.itemReg} activeClassName={classes.activeLink}>Sign
                                up</NavLink></div>
                        </div>
                    }

                </div>

                {/*<img src="https://forklog.com/wp-content/uploads/social-network1.jpg" alt="emblem"/>*/}
                {/*<div className={classes.loginBlock}>*/}
                {/*    {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> : <NavLink to={'/login'}>*/}
                {/*        Login*/}
                {/*    </NavLink>}*/}
                {/*</div>*/}
            </header> : <header className={`${classes.headerHome}`}>

            <div className={`${classes.headerHomeLeftBlock} ${classes.itemLeft}`}>
                Kanban board
            </div>
            <div className={classes.itemRight}>
                {props.token ? <div className={classes.containerIconName}><span onClick={() => {
                        setIsOpenUserList(true)
                    }} className={classes.wrapIconName}>{props.userName.substr(0, 1)}</span></div> :
                    <div className={classes.wrapNavbars}>
                        <div><NavLink to="/login" className={classes.itemLogin} activeClassName={classes.activeLink}>Sign
                            in</NavLink></div>
                        <div><NavLink to="/register" className={classes.itemReg} activeClassName={classes.activeLink}>Sign
                            up account</NavLink></div>
                    </div>
                }

            </div>

        </header>

    );
};

const mapStateToProps = (state) => ({
    isTaskInfo: state.columnsPage.isTaskInfo
})

export default connect(mapStateToProps, {setAuthUserData})(Header);