import axios from '@/api/axios'

const getEntity = apiUrl =>{
    return axios.get(apiUrl)
}

export default {
    getEntity
}