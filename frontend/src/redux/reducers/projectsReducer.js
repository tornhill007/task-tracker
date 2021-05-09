import {authAPI, projectsApi} from "../../api/api";
import {reset} from "redux-form";
import {getColumns} from "./columnsReducer";
// import {stopSubmit} from "redux-form"

const SET_ALL_PROJECTS = 'SET_ALL_PROJECTS';

let initialState = {
    projects: [],

};

const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_PROJECTS:
            return {
                ...state,
                projects: action.projects
            };
        default:
            return state;
    }
};


export const setProjects = (projects) => ({
    type: SET_ALL_PROJECTS,
    projects
});

export const createNewProject = (projectName) => async (dispatch) => {

    let response = await projectsApi.createNewProject(projectName);
    dispatch(getAllProjects());
    // console.log("response", response);
    // dispatch(getColumns(projectId));
    // console.log("response11", response);
    // setTimeout(() => {
    //
    // }, 2000)

};

export const removeProject = (projectId) => async (dispatch) => {

    try {
        let response = await projectsApi.removeProject(projectId);
    }
    catch (err) {
        console.log(err);
    }

    dispatch(getAllProjects());
    // console.log("response", response);
    // dispatch(getColumns(projectId));
    // console.log("response11", response);
    // setTimeout(() => {
    //
    // }, 2000)

};

export const getAllProjects = () => async (dispatch) => {
    try {
        let response = await projectsApi.getAllProjects();
        if (response.statusText === 'OK') {
            console.log(response)
            dispatch(setProjects(response.data));
        }
        else {
            console.log("ERROR")
        }

    }
    catch(err) {
        console.log(err)
    }
};

export const editProject = (id, name) => async (dispatch) => {
    try {
        let response = await projectsApi.editProject(id, name);
        if (response.statusText === 'OK') {
            console.log(response)
            dispatch(getAllProjects());
        }
        else {
            console.log("ERROR")
        }

    }
    catch(err) {
        console.log(err)
    }
};


// export const getAuthUserData = () => async (dispatch) => {
//     let response = await authAPI.me();
//     console.log(response);
//     if (response.data.resultCode === 0) {
//         let {id, email, login} = response.data.data;
//         dispatch(setAuthUserData(id, email, login, true));
//     }
// };
//
// export const login = (password, userName) => async (dispatch) => {
//     try {
//         let response = await authAPI.login(password, userName);
//         console.log(response);
//         if (response.statusText === 'OK') {
//             dispatch(reset('register'))
//             // dispatch(getAuthUserData());
//             let {userId, userName, token} = response.data;
//             dispatch(setAuthUserData(userId, userName, token));
//             let user = {
//                 userId,
//                 userName,
//                 token,
//                 timestamp: Date.now()
//             }
//             window.localStorage.setItem("user", JSON.stringify(user))
//         }
//         else {
//             let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
//             // dispatch(stopSubmit("login", {_error: message}))
//         }
//     }
//     catch (err) {
//         alert(err.response.data.message);
//     }
//
// };
//
// export const register = (password, userName, repeatPassword) => async (dispatch) => {
//     try {
//         if(password === repeatPassword) {
//             let response = await authAPI.register(password, userName);
//             console.log("123", response);
//             if (response.statusText === 'OK') {
//                 dispatch(reset('register'))
//                 alert('you have registered')
//             } else {
//                 alert(2)
//                 let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
//                 alert(message);
//
//                 // dispatch(stopSubmit("login", {_error: message}))
//             }
//         }
//         else {
//             alert("Password mismatch")
//         }
//
//     } catch (err) {
//         alert(err.response.data.message);
//     }
//
// };

// export const logout = (email, password, rememberMe) => async (dispatch) => {
//     let response = await authAPI.logout(email, password, rememberMe);
//     console.log(response);
//     if (response.data.resultCode === 0) {
//         dispatch(setAuthUserData(null, null, null, false));
//     }
// };

export default projectsReducer;