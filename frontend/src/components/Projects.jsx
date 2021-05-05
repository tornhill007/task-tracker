import React from 'react';
import ProjectInfo from "./ProjectInfo";

const Projects = (props) => {
    return <div className="App">
        {
            props.projects.map((project, index) => {
                return <ProjectInfo key={index} projectId={project.projectid} projectName={project.name}/>
            })
        }
    </div>
}

export default Projects;