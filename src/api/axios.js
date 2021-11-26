import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'
import {BASE_URL} from "@/helpers/vars";

axios.defaults.baseURL = BASE_URL
axios.interceptors.request.use(config => {
    const token = getItem('accessToken')
    config.headers.Authorization = token ?? ''
    return config
})

export default axios