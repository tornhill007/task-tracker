import React from "react";
import {NavLink} from "react-router-dom";

const ProjectInfo = (props) => {

    const onRemoveProject = (projectId) => {
       props.removeProject(projectId);
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
            <button onClick={() => onRemoveProject(props.projectId)}>Remove</button>
        </>
    );
}

export default ProjectInfo;