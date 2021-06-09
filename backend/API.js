//################  projects list  ###


//GET

/projects

//POST

/projects

//PUT

/projects/:projectId

//DELETE

/projects/:projectId

//############################  COLUMNS  ##


//GET

/columns/:projectId

//POST

/columns/:projectId

//PUT

/columns/position

/columns/:columnId

//DELETE

/columns/:columnId


//################# tasks ########

//POST

/tasks/:projectId

//PUT

/tasks/:projectId/:taskId

/tasks/position/:projectId

//DELETE

/tasks/:projectId/:taskId


//########## USERS #####3

//GET

/users

/users/active

//POST

/users


//############# AUTH ######

//POST

/login


//############### USERS/PROJECTS ############33

//POST

/users/projects/active

//DELETE

/users/projects/active

//#################### USERS/TASKS ################

//GET

/tasks/:projectId/:userId

/task/user/:taskId/:userId

// POST

/task/user

//DELETE

/task/user/:taskId/:userId


import * as axios from "axios";
import {baseUrl} from '../common/config/config';

const instance = axios.create({
    baseURL: baseUrl,
})

// const headers = {"Content-Type": "multipart/form-data"}

instance.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : '';

        if (token) {
            config.headers.Authorization = token;
        } else {
            delete instance.defaults.headers.common.Authorization;
        }
        return config;
    },

    error => Promise.reject(error)
);

export const usersApi = {
    getAllUsers() {
        return instance.get(`users/`);
    },
    addToProject(userid, projectid) {
        console.log("userid, projectid", userid, projectid)
        return instance.post(`projects/${projectid}/users/active`, {
            userid
        });
    },
    removeFromProject(userid, projectid) {
        return instance.delete(`projects/${projectid}/users/active`, {
            params: {
                userid
            }
        });
    },
    getActiveUsers(projectId) {
        return instance.get(`projects/${projectId}/all/users/active`);
    }
}

export const projectsApi = {
    createNewProject(projectName, userId, background) {
        return instance.post(`projects/`, {
            name: projectName,
            userId: userId,
            background
        })
    },
    editProject(id, name, userId) {
        return instance.put(`projects/${id}`, {
            name, userId
        })
    },
    removeProject(projectId, userId) {
        return instance.delete(`projects/${projectId}`)
    },
    getAllProjects(userId) {
        return instance.get(`projects/`, {
            params: {
                userId
            }
        });
    }
};

export const columnsApi = {
    removeColumn(id) {
        return instance.delete(`columns/${id}`)
    },

    updateColumn(id, name) {
        return instance.put(`columns/${id}`, {
            name
        })
    },

    createNewColumn(name, projectListId, position) {
        return instance.post(`projects/${projectListId}/columns`, {
            name, position
        })
    },

    getColumns(projectId) {
        return instance.get(`projects/${projectId}/columns`);
    },

    updateColumnsPosition(newColumns, projectId) {
        console.log("firstId, lastId, firstPosition, lastPosition", newColumns)
        return instance.put(`projects/${projectId}/columns/position`, {
            newColumns
        })
    }
};

export const tasksAPI = {
    updateTaskName(taskname, projectid, taskid) {
        return instance.put(`projects/${projectid}/update/tasks/${taskid}`, {
            taskname
        })
    },
    getParticipantOnTask(projectid, taskid) {
        return instance.get(`/task/user/${projectid}/${taskid}`)
    },

    updateTasksPosAndColumnId(tasksArr, projectId) {
        return instance.put(`/projects/${projectId}/tasks/position`, {
            tasksArr
        })
    },
    updateTaskDescription(description, projectId, taskId) {
        return instance.put(`projects/${projectId}/update/tasks/${taskId}`, {
            description
        })
    },

    getTasksUsers(projectId, userId) {
        return instance.get(`projects/${projectId}/tasks/users/${userId}`)
    },

    getAllTasks(projectId) {
        return instance.get(`tasks/` + projectId);
    },

    addNewTask(taskName, columnId, projectId, position) {
        return instance.post(`projects/${projectId}/tasks`, {
            taskName, columnId, position
        });
    },

    addNewParticipant(taskId, userId) {
        console.log("userId, taskId", userId, taskId);
        return instance.post(`/task/user`, {
            userId, taskId
        })
    },

    removeParticipant(taskId, userId) {
        console.log("userId, projectId, taskId", userId, taskId);
        return instance.delete(`/task/user/${taskId}/${userId}`)
    },

    addNewMarker(markers, projectId, taskId) {
        return instance.put(`projects/${projectId}/update/tasks/${taskId}`, {
            markers
        })
    },

    removeTask(taskId, projectId) {
        return instance.delete(`projects/${projectId}/tasks/${taskId}`)
    }
}

export const authAPI = {
    login(password, userName) {
        return axios.post(`${baseUrl}login`, {
            password,
            userName
        })
    },

    register(password, userName) {
        return axios.post(`${baseUrl}users`, {
            password,
            userName
        })
    },
};