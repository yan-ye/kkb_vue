import axios from "axios";

export function login(data) {
    return axios.post('/api/user/login',data)
}

export function getInfo() {
    return axios.get('/api/user/info')
}