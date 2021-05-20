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
    createNewProject(projectName, userId) {
        return instance.post(`projects/`, {
            name: projectName,
            userId: userId
        })
    },
    // leaveProject(userId, projectId) {
    //   return instance.delete(``)
    // },
    editProject(id, name, userId) {
        return instance.put(`projects/${id}`, {
            name, userId
        })
    },
    removeProject(projectId, userId) {
        return instance.delete(`projects/${projectId}`, {
            params: {
                userId
            }
        })
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
        // console.log("taskName, projectId, taskId", taskname, projectid, taskid)
        return instance.put(`/tasks/${projectid}/${taskid}`, {
            taskname
        })
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
    getAllTasks(projectId) {
        return instance.get(`tasks/` + projectId);
    },
    addNewTask(taskName, columnId, projectId, position) {
        return instance.post(`tasks/${projectId}`, {
            taskName, columnId, position
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
        return instance.delete(`/tasks/${projectId}/${id}`)
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
        return axios.post('http://localhost:5000/users', {
            password,
            userName
        })
    },
    // logout() {
    //     return instance.delete('auth/login')
    // }
};