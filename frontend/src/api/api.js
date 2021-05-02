import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/',
    // headers: {
    //     'Authorization': 'Bearer ' + jwtToken
    // }
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