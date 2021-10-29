import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'

axios.defaults.baseURL = 'http://localhost'
axios.interceptors.request.use(config => {
    const token = getItem('accessToken')
    config.headers.Authorization = token ?? ''
    return config
})

export default axios