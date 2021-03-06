import React from 'react';
import classes from './Home.module.css';
import hero from '../../assets/image/hero.png'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const Home = (props) => {
    // if()
    if (props.userData.token) {
        return <Redirect to={"/profile"}/>
    }
    return <div className="Home">
        <div className={classes.container}>
            <div className={classes.itemLeft}>
                <p className={classes.title}><span className={classes.firstTextItem}>Kanban</span> board helps teams get
                    the job done.</p>
                <p className={classes.text}>Collaborate, manage projects and increase your productivity. Wherever you
                    work - in a large building or in a home office - with Kanban board your team will succeed.</p>
            </div>
            <div className={classes.itemRight}>
                <div className={classes.wrapImg}>
                    <img className={classes.img} src={hero} alt=""/>
                </div>
            </div>
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    userData: state.auth
})

export default connect(mapStateToProps, {})(Home);