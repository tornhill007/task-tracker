import React, {useState, useRef, useEffect } from 'react';
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/reducers/authReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faHome, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import kanbanImg from '../../assets/image/kanbanboard_120442.svg';
import {withRouter} from 'react-router-dom';
import SvgItemProject from "./SvgItemProject/SvgItemProject";


function useOutsideAlerter(ref, fn) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                fn(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


const Header = (props) => {
    const wrapperRef = useRef(null);

    const [isOpenUserList, setIsOpenUserList] = useState(false);
    useOutsideAlerter(wrapperRef, setIsOpenUserList);
    const onLogout = () => {
        props.setAuthUserData(null, null, null);
        window.localStorage.removeItem('user');
    }

    return (
        props.token ? <header
            className={`${classes.header} ${props.match.params.projectId ? classes.headerProject : ''} ${props.isTaskInfo && classes.map}`}>
            {isOpenUserList && <div ref={wrapperRef} className={classes.userMenuWrap}>
                <div className={classes.borderItemTitle}>
                    <div><span>Account</span></div>
                    <div onClick={() => {
                        setIsOpenUserList(false)
                    }} className={classes.itenCloseItem}><FontAwesomeIcon icon={faTimes}/></div>
                </div>
                <div className={classes.wrapMenuLogin}>
                    <div title={props.userName} className={classes.imgItem}><span onClick={() => {
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
            <div className={classes.wrapNavLinks}>
            <div title="Projects" className={classes.itemCenter}>
                <NavLink to={'/projects'} className={classes.houseWrap}>
                    <FontAwesomeIcon icon={faHome} className={'fa-lg'}/>
                </NavLink>
            </div>
            <div title="Profile" className={classes.itemLeftIcon}>
                <NavLink to={'/profile'} className={classes.houseWrap}>
                    <FontAwesomeIcon icon={faUserCircle} className={'fa-lg'}/>
                </NavLink>
            </div>
            </div>
            <div className={`  ${classes.itemLeftMain}`}>
                <div
                    className={`${props.match.params.projectId ? classes.headerHomeLeftBlockMainProject : ''} ${classes.headerHomeLeftBlockMain}`}>
                    <div className={classes.wrapImg}>
                        <SvgItemProject projectId={props.match.params.projectId}/>
                    </div>
                    <div className={classes.title}>
                        Kanban board
                    </div>
                </div>
            </div>
            <div className={classes.itemRight}>
                {props.token ? <div title={props.userName} className={classes.containerIconName}><span onClick={() => {
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
        </header> : <header className={`${classes.headerHome}`}>
            <div className={`${classes.headerHomeLeftBlock} ${classes.itemLeft}`}>
                <div className={classes.wrapImg}>
                    <img className={classes.img}
                         src={kanbanImg}
                         alt=""/>
                </div>
                <div className={classes.wrapperTitleHeader}>
                    Kanban board
                </div>
            </div>
            <div >
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