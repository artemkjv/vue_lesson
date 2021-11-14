import axios from '@/api/axios'

const getEntity = apiUrl =>{
    return axios.get(apiUrl)
}

const createEntity = (apiUrl, data) => {
    return axios.post(apiUrl, data)
}

const deleteEntity = (apiUrl) => {
    return axios.delete(apiUrl)
}

const editEntity = (apiUrl, data) => {
    return axios.put(apiUrl, data)
}

export default {
    getEntity,
    createEntity,
    deleteEntity,
    editEntity
}