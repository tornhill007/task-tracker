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

export const projectsApi = {
    getAllProjects() {
        return instance.get(`projects/`);
    }
};

export const columnsApi = {
    getColumns(projectId) {
        return instance.get(`columns/` + projectId);
    },
    updateColumnsPosition(firstId, lastId, firstPosition, lastPosition) {
        console.log("firstId, lastId, firstPosition, lastPosition", firstId, lastId, firstPosition, lastPosition)
        return instance.put('colposition/', {
            firstId, lastId, firstPosition, lastPosition
        })
    }
};


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