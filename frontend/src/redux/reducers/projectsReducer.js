import {projectsApi} from "../../api/api";
import {getAllUsers} from "./usersReducer";

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

export const createNewProject = (projectName, userId, background) => async (dispatch) => {
    try {
        let response = await projectsApi.createNewProject(projectName, userId, background);
        dispatch(getAllProjects(userId));
    } catch (e) {
        console.log("error", e);
    }
};
export const removeProject = (projectId, userId) => async (dispatch) => {
    try {
        let response = await projectsApi.removeProject(projectId, userId);
    } catch (err) {
        console.log(err);
    }
    dispatch(getAllUsers(projectId, true));
    dispatch(getAllProjects(userId));
};

export const getAllProjects = (userId, userName, token) => async (dispatch) => {
    try {
        let response = await projectsApi.getAllProjects(userId);
        if (response.statusText === 'OK') {
            dispatch(setProjects(response.data));
        } else {
            console.log("ERROR")
        }
    } catch (err) {
        console.log(err)
    }
};

export const editProject = (id, name, userId) => async (dispatch) => {
    try {
        let response = await projectsApi.editProject(id, name, userId);
        if (response.statusText === 'OK') {
            dispatch(getAllProjects(userId));
        } else {
            console.log("ERROR")
        }
    } catch (err) {
        console.log(err)
    }
};


export default projectsReducer;