import React, {useState} from 'react';
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/reducers/authReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import kanbanImg from '../../assets/image/kanbanboard_120442.svg';
import {withRouter} from 'react-router-dom';

const Header = (props) => {

    console.log("[props]", props.match.params.projectId)

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
        props.token ? <header
            className={`${classes.header} ${props.match.params.projectId ? classes.headerProject : ''} ${props.isTaskInfo && classes.map}`}>
            {isOpenUserList && <div className={classes.userMenuWrap}>
                {/*<div className={classes.borderWrapTitle}>*/}
                <div className={classes.borderItemTitle}>
                    <div><span>Account</span></div>
                    <div onClick={() => {
                        setIsOpenUserList(false)
                    }} className={classes.itenCloseItem}><FontAwesomeIcon icon={faTimes}/></div>
                </div>
                {/*</div>*/}

                <div className={classes.wrapMenuLogin}>
                    <div className={classes.imgItem}><span onClick={() => {
                        setIsOpenUserList(true)
                    }} className={classes.wrapIconMain}>{props.userName.substr(0, 1)}</span></div>

                    <div className={classes.itemLoginName}>{props.userName}</div>
                </div>
                <div onClick={() => {
                    onLogout()
                }} className={classes.itemLogout}>
                    <span>Log out</span>
                </div>
            </div>}
            <div className={classes.itemCenter}>

            </div>


            <div className={`  ${classes.itemLeftMain}`}>
                <div
                    className={`${props.match.params.projectId ? classes.headerHomeLeftBlockMainProject : ''} ${classes.headerHomeLeftBlockMain}`}>
                    <div className={classes.wrapImg}>
                        <svg
                            className={`${props.match.params.projectId ? classes.svgItemProject : ''} ${classes.svgItem}`}
                            xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                            <path
                                d="M9,3 L9,21 L15,21 L15,3 L9,3 Z M8,3 L3.5,3 C2.67157288,3 2,3.67157288 2,4.5 L2,19.5 C2,20.3284271 2.67157288,21 3.5,21 L8,21 L8,3 Z M16,3 L16,21 L20.5,21 C21.3284271,21 22,20.3284271 22,19.5 L22,4.5 C22,3.67157288 21.3284271,3 20.5,3 L16,3 Z M1,4.5 C1,3.11928813 2.11928813,2 3.5,2 L20.5,2 C21.8807119,2 23,3.11928813 23,4.5 L23,19.5 C23,20.8807119 21.8807119,22 20.5,22 L3.5,22 C2.11928813,22 1,20.8807119 1,19.5 L1,4.5 Z M4,6 L6,6 C6.55228475,6 7,6.44771525 7,7 L7,8 C7,8.55228475 6.55228475,9 6,9 L4,9 C3.44771525,9 3,8.55228475 3,8 L3,7 C3,6.44771525 3.44771525,6 4,6 Z M4,10 L6,10 C6.55228475,10 7,10.4477153 7,11 L7,12 C7,12.5522847 6.55228475,13 6,13 L4,13 C3.44771525,13 3,12.5522847 3,12 L3,11 C3,10.4477153 3.44771525,10 4,10 Z M11,6 L13,6 C13.5522847,6 14,6.44771525 14,7 L14,8 C14,8.55228475 13.5522847,9 13,9 L11,9 C10.4477153,9 10,8.55228475 10,8 L10,7 C10,6.44771525 10.4477153,6 11,6 Z M18,6 L20,6 C20.5522847,6 21,6.44771525 21,7 L21,8 C21,8.55228475 20.5522847,9 20,9 L18,9 C17.4477153,9 17,8.55228475 17,8 L17,7 C17,6.44771525 17.4477153,6 18,6 Z M18,10 L20,10 C20.5522847,10 21,10.4477153 21,11 L21,12 C21,12.5522847 20.5522847,13 20,13 L18,13 C17.4477153,13 17,12.5522847 17,12 L17,11 C17,10.4477153 17.4477153,10 18,10 Z M18,14 L20,14 C20.5522847,14 21,14.4477153 21,15 L21,16 C21,16.5522847 20.5522847,17 20,17 L18,17 C17.4477153,17 17,16.5522847 17,16 L17,15 C17,14.4477153 17.4477153,14 18,14 Z M4,7 L4,8 L6,8 L6,7 L4,7 Z M4,11 L4,12 L6,12 L6,11 L4,11 Z M11,7 L11,8 L13,8 L13,7 L11,7 Z M18,7 L18,8 L20,8 L20,7 L18,7 Z M18,11 L18,12 L20,12 L20,11 L18,11 Z M18,15 L18,16 L20,16 L20,15 L18,15 Z M3.5,5 C3.22385763,5 3,4.77614237 3,4.5 C3,4.22385763 3.22385763,4 3.5,4 L6.5,4 C6.77614237,4 7,4.22385763 7,4.5 C7,4.77614237 6.77614237,5 6.5,5 L3.5,5 Z M10.5,5 C10.2238576,5 10,4.77614237 10,4.5 C10,4.22385763 10.2238576,4 10.5,4 L13.5,4 C13.7761424,4 14,4.22385763 14,4.5 C14,4.77614237 13.7761424,5 13.5,5 L10.5,5 Z M17.5,5 C17.2238576,5 17,4.77614237 17,4.5 C17,4.22385763 17.2238576,4 17.5,4 L20.5,4 C20.7761424,4 21,4.22385763 21,4.5 C21,4.77614237 20.7761424,5 20.5,5 L17.5,5 Z"/>
                        </svg>

                    </div>
                    <div>
                        Kanban board
                    </div>
                </div>
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
                <div className={classes.wrapImg}>
                    <img className={classes.img}
                         src={kanbanImg}
                         alt=""/>
                </div>
                <div>
                    Kanban board
                </div>
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

export default connect(mapStateToProps, {setAuthUserData})(withRouter(Header));