import React from "react";
import AuthRedirectComponent from "./Project";
import Projects from "./Projects";
import {connect} from "react-redux";
import {projectsApi} from "../api/api";
import {setProjects} from "../redux/reducers/projectsReducer";
class ProjectsContainer extends React.Component {

    getProjects = async () => {
        try {
            let response = await projectsApi.getAllProjects();
            if (response.statusText === 'OK') {
                console.log(response)
                this.props.setProjects(response.data);
            }
            else {
                console.log("ERROR")
            }

        }
        catch(err) {
            console.log(err)
        }

    }


    componentDidMount() {
        this.getProjects()
        // this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    render() {
        console.log("projects", this.props.projects)
        return (
            <Projects projects={this.props.projects}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projectsPage.projects
    }
};

export default connect(mapStateToProps, {setProjects})(ProjectsContainer);



