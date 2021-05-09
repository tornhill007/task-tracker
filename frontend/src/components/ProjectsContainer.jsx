import React from "react";
import AuthRedirectComponent from "./Project";
import Projects from "./Projects";
import {connect} from "react-redux";
import {projectsApi} from "../api/api";
import {getAllProjects, removeProject, setProjects} from "../redux/reducers/projectsReducer";
import {openModal} from "../redux/reducers/columnsReducer";
import {getAllUsers} from "../redux/reducers/usersReducer";
class ProjectsContainer extends React.Component {

    getProjects = async () => {
       this.props.getAllProjects();
    }

    getUsers = () => {
        this.props.getAllUsers();
    }


    componentDidMount() {
        this.getProjects();
        this.getUsers();
        // this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    render() {
        console.log("projects", this.props.projects)
        console.log("users", this.props.users)
        return (
            <Projects removeProject={this.props.removeProject} projects={this.props.projects} openModal={this.props.openModal}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projectsPage.projects,
        users: state.usersPage.users
    }
};

export default connect(mapStateToProps, {getAllUsers, setProjects, openModal, getAllProjects, removeProject})(ProjectsContainer);



