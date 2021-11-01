import axios from '@/api/axios'

const register = credentials => {
    return axios.post('/register', credentials)
}

const login = credentials => {
    return axios.post('/login', credentials)
}

const getCurrentUser = () => {
    return axios.get('/user')
}

const update = data => {
    return axios.post('/user/update', data)
}

export default {
    register,
    login,
    getCurrentUser,
    update
}