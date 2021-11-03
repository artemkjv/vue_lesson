import axios from '@/api/axios'

const getEntities = apiUrl => {
    return axios.get(apiUrl)
}

export default {
    getEntities
}