import React from "react";
import {NavLink} from "react-router-dom";
import classes from './Projects.module.css';
import {connect} from "react-redux";
import background1 from '../assets/image/background/background1.jpg';
import background2 from '../assets/image/background/background2.jpg';
import background3 from '../assets/image/background/background3.jpg';
import background4 from '../assets/image/background/background4.jpg';
import background5 from '../assets/image/background/background5.jpg';
import background6 from '../assets/image/background/background6.jpg';
import background7 from '../assets/image/background/background7.jpg';
import background8 from '../assets/image/background/background8.jpg';
import background9 from '../assets/image/background/background9.jpg';
import backgroundsArr from '../common/backgrounds/backgrounds'

const ProjectInfo = (props) => {

   const backgrounds = backgroundsArr;

    const getBackground = (background) => {
       return backgrounds.find(item => item.title === background).background
    }

    const onRemoveProject = (projectId, userId) => {
       props.removeProject(projectId, userId);
    }

    return (<>
        <NavLink style={{backgroundImage: `url(${getBackground(props.background)})`}} to={{
            pathname: `/projects/${props.projectId}`,
            aboutProps: {projectId: props.projectId},
        }} className={classes.wrapperItemProject}>
        <div className={classes.wrapTitleProject}>
            <div>
                <span className={`${classes.colorTitle} ${classes.itemName}`}>{props.projectName}</span>
            </div>
        </div>

        </NavLink>
            {/*<button onClick={() => onRemoveProject(props.projectId, props.userId)}>Remove</button>*/}
        </>
    );
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(ProjectInfo);