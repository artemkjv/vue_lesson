import axios from '@/api/axios'

const getEntity = apiUrl =>{
    return axios.get(apiUrl)
}

const createEntity = (apiUrl, data) => {
    return axios.post(apiUrl, data)
}

export default {
    getEntity,
    createEntity
}