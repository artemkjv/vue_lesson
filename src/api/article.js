import axios from "@/api/axios";

const getArticle = slug => {
    return axios.get(`/articles/${slug}`)
        .then(response => response.data.article)
}

const deleteArticle = slug => {
    return axios.delete(`/articles/${slug}`)
}

const createArticle = body => {
    return axios
        .post('/articles', {article: body})
        .then(response => response.data.article)
}

const updateArticle = (slug, body) => {
    return axios.put(`/articles/${slug}`, body)
        .then(response => response.data.article)
}

const addToFavorites = slug => {
    return axios.post(`/articles/${slug}/favorite`)
        .then(response => response.data.article)
}

const removeFromFavorites = slug => {
    return axios.delete(`/articles/${slug}/favorite`)
        .then(response => response.data.article)
}

export default {
    getArticle,
    deleteArticle,
    createArticle,
    updateArticle,
    addToFavorites,
    removeFromFavorites
}