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
import {setProjects} from "./projectsReducer";
import {getColumns} from "./columnsReducer";

const SET_ALL_USERS = 'SET_ALL_USERS';
const SET_IS_OPEN_USERS_LIST = 'SET_IS_OPEN_USERS_LIST';
const SET_IS_OPEN_MARKERS_LIST = 'SET_IS_OPEN_MARKERS_LIST';

let initialState = {
    users: [],
    isOpenUsersList: false,
    isOpenMarkersList: false,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ALL_USERS:
            return {
                ...state,
                users: action.users
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

export const setIsOpenUserList = () => ({
    type: SET_IS_OPEN_USERS_LIST,
})

export const setIsOpenMarkersList = () => ({
    type: SET_IS_OPEN_MARKERS_LIST,
})

export const getAllUsers = () => async (dispatch) => {
    try {
        let response = await usersApi.getAllUsers();
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


export default usersReducer;