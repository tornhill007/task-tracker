import React from 'react';
import ProjectInfo from "./ProjectInfo";
import EditModalContainer from "./Modal/EditModal/EditModalContainer";

const Projects = (props) => {


    const addNewProject = (title, buttonName) => {
        props.openModal(<EditModalContainer title={title} parameters={{buttonName}}/>);
    };

    return <div className="App">
        <button onClick={() => addNewProject("Create New Project", "Create new project")}>New project</button>
        {
            props.projects.map((project, index) => {
                return <ProjectInfo removeProject={props.removeProject} key={index} projectId={project.projectid} projectName={project.name}/>
            })
        }
    </div>
}

export default Projects;