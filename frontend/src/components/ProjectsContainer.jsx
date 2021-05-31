import React from "react";
import AuthRedirectComponent from "./Project";
import Projects from "./Projects";
import {connect} from "react-redux";
import {projectsApi} from "../api/api";
import {getAllProjects, removeProject, setProjects} from "../redux/reducers/projectsReducer";
import {openModal} from "../redux/reducers/columnsReducer";
import {getAllUsers} from "../redux/reducers/usersReducer";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {setAuthUserData} from "../redux/reducers/authReducer";

class ProjectsContainer extends React.Component {

    getProjects = async (userId, userName, token) => {
        this.props.getAllProjects(userId, userName, token);
    }

    getUsers = () => {
        this.props.getAllUsers();
    }

    componentDidMount() {
        if (JSON.parse(localStorage.getItem('user'))) {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user.timestamp > Date.now() - 3600000) {
                console.log(user.userId, user.userName, user.token)
                this.props.setAuthUserData(user.userId, user.userName, user.token)
                this.getProjects(user.userId, user.userName, user.token);
            } else {
                window.localStorage.removeItem('user');

                this.props.setAuthUserData(null, null, null)
            }
        }

    }

    render() {
        return (
            <Projects userId={this.props.userId} removeProject={this.props.removeProject} projects={this.props.projects}
                      openModal={this.props.openModal}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projectsPage.projects,
        users: state.usersPage.users,
        userId: state.auth.userId
    }
};

let AuthRedirectComponentProjects = withAuthRedirect(ProjectsContainer);

export default connect(mapStateToProps, {
    setAuthUserData,
    getAllUsers,
    setProjects,
    openModal,
    getAllProjects,
    removeProject
})(AuthRedirectComponentProjects);



