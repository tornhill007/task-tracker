import React from 'react';
import classes from './Home.module.css';

const Home = (props) => {
    return <div className="Home">
        <div className={classes.container}>
            <div className={classes.itemLeft}>
                <p className={classes.title}><span className={classes.firstTextItem}>Kanban</span> board helps teams get the job done.</p>
                <p className={classes.text}>Collaborate, manage projects and increase your productivity. Wherever you work - in a large building or in a home office - with Kanban board your team will succeed.</p>
            </div>
            <div className={classes.itemRight}>
        <div className={classes.wrapImg}>
        <img className={classes.img} src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png" alt=""/>
        </div>
            </div>
        </div>
        </div>
}

export default Home;