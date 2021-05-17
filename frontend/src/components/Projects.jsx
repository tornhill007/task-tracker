import React from 'react';
import ProjectInfo from "./ProjectInfo";
import EditModalContainer from "./Modal/EditModal/EditModalContainer";
import classes from './Projects.module.css'

const Projects = (props) => {


    const addNewProject = (title, buttonName) => {
        props.openModal(<EditModalContainer title={title} parameters={{buttonName}}/>);
    };

    return <div >
        <div className={classes.wrapIcon}>
            <div className={classes.icon}>
                P
            </div>
            <div className={classes.titleMargin}>Project's list</div>
        </div>


        {/*<button onClick={() => addNewProject("Create New Project", "Create new project")}>New project</button>*/}
<div className={classes.mainContainer}>
        <div className={classes.wrapList}>
            {
                props.projects.map((project, index) => {
                    return <ProjectInfo userId={props.userId} removeProject={props.removeProject} key={index}
                                        projectId={project.projectid} projectName={project.name}/>
                })

            }
            <div onClick={() => addNewProject("Create New Project", "Create new project")} className={`${classes.wrapperItemProject} ${classes.itemCreate}`}>
                <div>
                    <div>
                        <span className={` ${classes.itemName} ${classes.itemCreateText}`}>Create project</span>
                    </div>
                </div>
            </div>
        </div>
</div>

    </div>
}

export default Projects;