import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    // headers: {
    //     'Authorization': JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : ''
    // }
})

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

// export const profileAPI = {
//
//     getProfile(userId) {
//         return instance.get(`profile/` + userId)
//     },
//     getStatus(userId) {
//         return instance.get(`profile/status/` + userId)
//     },
//     updateStatus(status) {
//         return instance.put(`profile/status`, {
//             status: status
//         })
//
// };

export const usersApi = {
    getAllUsers() {
        return instance.get(`register/`);
    },
    addToProject(userid, projectid) {
        console.log("userid, projectid", userid, projectid)
        return instance.post(`activeusers/`, {
            userid, projectid
        });
    },
    removeFromProject(userid, projectid) {
        return instance.delete(`activeusers/`, {
            params: {
                userid, projectid
            }
        });
    },
    getActiveUsers(projectId) {
        return instance.get(`inproject/`, {
            params: {
                projectId
            }
        });
    }

}

export const projectsApi = {
    createNewProject(projectName, userId) {
        return instance.post(`projects/`, {
            name: projectName,
            userId: userId
        })
    },
    editProject(id, name) {
        return instance.put(`projects/${id}`, {
            name
        })
    },
    removeProject(projectId) {
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
        return instance.post(`column/`, {
            name, projectListId, position
        })
    },
    getColumns(projectId) {
        return instance.get(`columns/` + projectId);
    },
    updateColumnsPosition(newColumns) {
        console.log("firstId, lastId, firstPosition, lastPosition", newColumns)
        return instance.put('columnposition/', {
            newColumns
        })
    }
};

export const tasksAPI = {
    updateTaskName(taskName, projectId, taskId) {
        console.log("taskName, projectId, taskId", taskName, projectId, taskId)
        return instance.put(`/tasks/${projectId}/${taskId}`, {
            taskName
        })
    },
    updateTasksPosAndColumnId(tasksArr, projectId) {
        return instance.put(`/tasksposition/${projectId}`, {
            tasksArr
        })
    },
    updateTaskDescription(description, projectId, taskId) {
        return instance.put(`/tasks/${projectId}/${taskId}`, {
            description
        })
    },
    getAllTasks(projectId) {

        return instance.get(`tasks/` + projectId);
    },
    addNewTask(taskName, columnId, projectId, position) {
        return instance.post(`task/`, {
            taskName, columnId, projectId, position
        });
    },
    addNewParticipant(users, projectId, taskId) {
        return instance.put(`/tasks/${projectId}/${taskId}`, {
            users
        })
    },
    addNewMarker(markers, projectId, taskId) {
        return instance.put(`/tasks/${projectId}/${taskId}`, {
            markers
        })
    },
    removeTask(id, projectId) {
        return instance.delete(`/task/${projectId}/${id}`)
    }
}


export const authAPI = {
    // me() {
    //     return instance.get(`auth/me`)
    // },
    login(password, userName) {
        return axios.post('http://localhost:5000/login', {
            password,
            userName
        })
    },
    register(password, userName) {
        return axios.post('http://localhost:5000/register', {
            password,
            userName
        })
    },
    // logout() {
    //     return instance.delete('auth/login')
    // }
};