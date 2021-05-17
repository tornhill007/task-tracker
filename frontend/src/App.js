import './App.css';
import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect, Provider} from "react-redux";
import store from "./redux/store";
import {compose} from "redux";
import Profile from "./components/Profile";
import Projects from "./components/ProjectsContainer";
import Project from "./components/Project";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginLayoutRoute from "./layouts/loginLayout";
import DashboardLayoutRoute from "./layouts/DashboardLayout";
import Home from "./components/Home/Home";
import {setAuthUserData} from "./redux/reducers/authReducer";
import ModalContainer from "./components/Modal/ModalContainer";
import TaskInfo from "./components/Tasks/TaskInfo/TaskInfo";


class App extends React.Component {

    componentDidMount() {

    }


    render() {
        return <div className="App">
            <div className='app-wrapper-content'>
                <ModalContainer/>
                <Switch>
                    <DashboardLayoutRoute exact path='/' component={Home}/>
                    <DashboardLayoutRoute path='/profile'  component={Profile}/>
                    <DashboardLayoutRoute path='/projects/:projectId/:taskId'  component={TaskInfo}/>
                    <DashboardLayoutRoute path='/projects/:projectId'  component={Project}/>
                    <DashboardLayoutRoute path='/projects'  component={Projects}/>
                    <LoginLayoutRoute path='/register'  component={Register}/>
                    <LoginLayoutRoute path='/login' component={Login}/>
                </Switch>
            </div>
        </div>
    }

}


const mapStateToProps = (state) => ({});

let AppContainer = compose(
    connect(mapStateToProps, {setAuthUserData}))
(App);


const mainApp = () => {
    console.log()
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    );
}

export default mainApp;