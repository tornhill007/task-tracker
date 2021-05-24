import {
    authAPI,
    columnsApi,
    columnsApi as columnsAPI,
    projectsApi, tasksAPI,
    usersApi
} from "../../api/api";
import {reset} from "redux-form";
// import {stopSubmit} from "redux-form"
import {sortByPosition} from '../../utils/sort'
import {getAllProjects, removeProject, setProjects} from "./projectsReducer";
import {getColumns} from "./columnsReducer";

const SET_ALL_USERS = 'SET_ALL_USERS';
const SET_IS_OPEN_USERS_LIST = 'SET_IS_OPEN_USERS_LIST';
const SET_IS_OPEN_MARKERS_LIST = 'SET_IS_OPEN_MARKERS_LIST';
const SET_ACTIVE_USERS = 'SET_ACTIVE_USERS';

let initialState = {
    users: [],
    isOpenUsersList: false,
    isOpenMarkersList: false,
    activeUsers: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ALL_USERS:
            return {
                ...state,
                users: action.users
            };

        case SET_ACTIVE_USERS:
            return {
                ...state,
                activeUsers: action.users.map(user => user.username)
            };

        case SET_IS_OPEN_USERS_LIST:
            return {
                ...state,
                isOpenUsersList: !state.isOpenUsersList
            };

        case SET_IS_OPEN_MARKERS_LIST:
            return {
                ...state,
                isOpenMarkersList: !state.isOpenMarkersList
            };

        default:
            return state;
    }

};

export const setAllUsers = (users) => ({
    type: SET_ALL_USERS,
    users
})

export const setActiveUsers = (users) => ({
    type: SET_ACTIVE_USERS,
    users
})

export const setIsOpenUserList = () => ({
    type: SET_IS_OPEN_USERS_LIST,
})

export const setIsOpenMarkersList = () => ({
    type: SET_IS_OPEN_MARKERS_LIST,
})

export const getAllUsers = (projectId, isRemoveProject) => async (dispatch) => {
    try {
        let response = await usersApi.getAllUsers();

        if (!isRemoveProject) {
            let response1 = await usersApi.getActiveUsers(projectId);
            console.log("response1", response1);
            if (response1.statusText === 'OK') {
                console.log("[RESPONSE1]", response1)
                dispatch(setActiveUsers(response1.data));
            } else {
                console.log("ERROR")
            }
        }


        if (response.statusText === 'OK') {
            console.log("[RESPONSE]", response)
            dispatch(setAllUsers(response.data));
        } else {
            console.log("ERROR")
        }


    } catch (err) {
        console.log(err)
    }
};

export const addNewParticipant = (participants, projectId, taskId) => async (dispatch) => {
    try {
        let response = await tasksAPI.addNewParticipant(participants, projectId, taskId);
        if (response.statusText === 'OK') {
            console.log("[RESPONSE]", response)
            dispatch(getColumns(projectId));
        } else {
            console.log("ERROR")
        }

    } catch (err) {
        console.log(err)
    }
};

export const addToProject = (userId, projectId) => async (dispatch) => {
    try {
        let response = await usersApi.addToProject(userId, projectId);
        if (response.statusText === 'OK') {
            console.log("[RESPONSE]", response)
            dispatch(getAllUsers(projectId));
        } else {
            console.log("ERROR")
        }

    } catch (err) {
        console.log(err)
    }
};

export const removeFromProject = (userId, projectId) => async (dispatch) => {
    try {
        let response = await usersApi.removeFromProject(userId, projectId);
        if (response.statusText === 'OK') {
            console.log("[RESPONSE]", response)
            dispatch(getAllUsers(projectId));
        } else {
            console.log("ERROR")
        }

    } catch (err) {
        console.log(err)
    }
};

export const leaveProject = (userId, projectId) => async (dispatch) => {
    try {
        let response = await usersApi.removeFromProject(userId, projectId);
        console.log("[RESPONSE]", response)
        if (response.statusText === 'OK') {

            if (response.data.length === 0) {
                dispatch(removeProject(projectId, userId));
                return;
            }
            dispatch(getAllUsers(projectId));
            dispatch(getAllProjects(userId));
        } else {
            console.log("ERROR")
        }

    } catch (err) {
        console.log(err)
    }
};


export default usersReducer;