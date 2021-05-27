import {authAPI, projectsApi} from "../../api/api";
import {reset} from "redux-form";
import {getColumns} from "./columnsReducer";
import {getAllUsers} from "./usersReducer";
// import {stopSubmit} from "redux-form"

const SET_ALL_PROJECTS = 'SET_ALL_PROJECTS';
const SET_IS_OPEN_INVITE_LIST = 'SET_IS_OPEN_INVITE_LIST';
const SET_IS_OPEN_INPUT_EDIT_PROJECT = 'SET_IS_OPEN_INPUT_EDIT_PROJECT';

let initialState = {
    projects: [],
    IsOpenInviteList: false,
    isOpenInputEditProject: false
};

const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_PROJECTS:
            return {
                ...state,
                projects: action.projects
            };

            case SET_IS_OPEN_INPUT_EDIT_PROJECT:
            return {
                ...state,
                isOpenInputEditProject: !state.isOpenInputEditProject
            };

            case SET_IS_OPEN_INVITE_LIST:
            return {
                ...state,
                IsOpenInviteList: !state.IsOpenInviteList
            };
        default:
            return state;
    }
};


export const setProjects = (projects) => ({
    type: SET_ALL_PROJECTS,
    projects
});

export const setIsOpenInviteList = () => ({
    type: SET_IS_OPEN_INVITE_LIST
});

export const setIsOpenInputEditProject = () => ({
    type: SET_IS_OPEN_INPUT_EDIT_PROJECT
});

export const createNewProject = (projectName, userId) => async (dispatch) => {

    let response = await projectsApi.createNewProject(projectName, userId);
    dispatch(getAllProjects(userId));
    // console.log("response", response);
    // dispatch(getColumns(projectId));
    // console.log("response11", response);
    // setTimeout(() => {
    //
    // }, 2000)

};

export const removeProject = (projectId, userId) => async (dispatch) => {

    try {
        let response = await projectsApi.removeProject(projectId, userId);
    }
    catch (err) {
        console.log(err);
    }
    dispatch(getAllUsers(projectId, true));
    dispatch(getAllProjects(userId));
    // console.log("response", response);
    // dispatch(getColumns(projectId));
    // console.log("response11", response);
    // setTimeout(() => {
    //
    // }, 2000)

};

export const getAllProjects = (userId, userName, token) => async (dispatch) => {
    try {
        console.log("userId", userId)
        let response = await projectsApi.getAllProjects(userId);

        console.log("response[PROJECT]", response)
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

export const editProject = (id, name, userId) => async (dispatch) => {
    try {
        let response = await projectsApi.editProject(id, name, userId);
        if (response.statusText === 'OK') {
            console.log(response)
            dispatch(getAllProjects(userId));
        }
        else {
            console.log("ERROR")
        }

    }
    catch(err) {
        console.log(err)
    }
};

// export const leaveProject = (userId, projectId) => async (dispatch) => {
//     try {
//         let response = await projectsApi.leaveProject(userId, projectId);
//         if (response.statusText === 'OK') {
//             console.log(response)
//             dispatch(getAllProjects(userId));
//         }
//         else {
//             console.log("ERROR")
//         }
//
//     }
//     catch(err) {
//         console.log(err)
//     }
// };


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