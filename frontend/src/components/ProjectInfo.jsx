import React from "react";
import {NavLink} from "react-router-dom";

const ProjectInfo = (props) => {

    return (
        <NavLink to={`/projects/${props.projectId}`}>
            <div>
                <span>{props.projectName}</span>
            </div>
        </NavLink>
    );
}

export default ProjectInfo;