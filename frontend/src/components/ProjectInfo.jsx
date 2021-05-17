import React from "react";
import {NavLink} from "react-router-dom";

const ProjectInfo = (props) => {

    const onRemoveProject = (projectId, userId) => {
       props.removeProject(projectId, userId);
    }

    return (
        <>
        <NavLink to={{
            pathname: `/projects/${props.projectId}`,
            aboutProps: {projectId: props.projectId}
        }}>
            <div>
                <span>{props.projectName}</span>
            </div>
        </NavLink>
            <button onClick={() => onRemoveProject(props.projectId, props.userId)}>Remove</button>
        </>
    );
}

export default ProjectInfo;