import React from "react";
import {NavLink} from "react-router-dom";
import classes from './Projects.module.css';
import {connect} from "react-redux";
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
        </>
    );
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(ProjectInfo);