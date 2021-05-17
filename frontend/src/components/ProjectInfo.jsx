import React from "react";
import {NavLink} from "react-router-dom";
import classes from './Projects.module.css'

const ProjectInfo = (props) => {

    const onRemoveProject = (projectId, userId) => {
       props.removeProject(projectId, userId);
    }

    return (
        <NavLink to={{
            pathname: `/projects/${props.projectId}`,
            aboutProps: {projectId: props.projectId}
        }} className={classes.wrapperItemProject}>
        <div>
            <div>
                <span className={` ${classes.itemName}`}>{props.projectName}</span>
            </div>
        </div>
            {/*<button onClick={() => onRemoveProject(props.projectId, props.userId)}>Remove</button>*/}
        </NavLink>
    );
}

export default ProjectInfo;