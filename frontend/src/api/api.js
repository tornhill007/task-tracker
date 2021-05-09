import * as axios from "axios";

const instance = axios.create({
    // withCredentials: true,
    baseURL: 'http://localhost:5000/',
    headers: {
        'Authorization': JSON.parse(localStorage.getItem('user')).token
    }
})


export const profileAPI = {

    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {
            status: status
        })
    }
};

export const usersApi = {
    getAllUsers() {
        return instance.get(`register/`);
    },
}

export const projectsApi = {
    createNewProject(projectName) {
        return instance.post(`projects/`, {
            name: projectName
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
    getAllProjects() {
        return instance.get(`projects/`);
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
        return instance.put('colposition/', {
            newColumns
        })
    }
};

export const tasksApi = {
    getAllTasks(projectId) {
        return instance.get(`tasks/` + projectId);
    },
    addNewTask(taskName, columnId, projectId) {
        return instance.post(`task/`, {
            taskName, columnId, projectId
        });
    },
    addNewParticipant(users, projectId, taskId) {
        return instance.put(`/tasks/${projectId}/${taskId}`, {
            users
        })
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