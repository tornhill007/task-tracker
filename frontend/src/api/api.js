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
        return instance.post(`users/projects/active`, {
            userid, projectid
        });
    },
    removeFromProject(userid, projectid) {
        return instance.delete(`users/projects/active`, {
            params: {
                userid, projectid
            }
        });
    },
    getActiveUsers(projectId) {
        return instance.get(`users/active`, {
            params: {
                projectId
            }
        });
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
        return instance.post(`columns/${projectListId}`, {
            name, position
        })
    },

    getColumns(projectId) {
        return instance.get(`columns/${projectId}`);
    },

    updateColumnsPosition(newColumns) {
        console.log("firstId, lastId, firstPosition, lastPosition", newColumns)
        return instance.put('columns/position', {
            newColumns
        })
    }
};

export const tasksAPI = {
    updateTaskName(taskname, projectid, taskid) {
        return instance.put(`/tasks/${projectid}/${taskid}`, {
            taskname
        })
    },
    getParticipantOnTask(projectid, taskid) {
        return instance.get(`/task/user/${projectid}/${taskid}`)
    },

    updateTasksPosAndColumnId(tasksArr, projectId) {
        return instance.put(`/tasks/position/${projectId}`, {
            tasksArr
        })
    },
    updateTaskDescription(description, projectId, taskId) {
        return instance.put(`/tasks/${projectId}/${taskId}`, {
            description
        })
    },

    getTasksUsers(projectId, userId) {
      return instance.get(`tasks/${projectId}/${userId}`)
    },

    getAllTasks(projectId) {
        return instance.get(`tasks/` + projectId);
    },

    addNewTask(taskName, columnId, projectId, position) {
        return instance.post(`tasks/${projectId}`, {
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
        return instance.put(`/tasks/${projectId}/${taskId}`, {
            markers
        })
    },

    removeTask(id, projectId) {
        return instance.delete(`/tasks/${projectId}/${id}`)
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