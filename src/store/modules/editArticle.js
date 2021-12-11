import articleApi from '@/api/article'

const state = {
    isSubmitting: false,
    validationErrors: null,
    isLoading: false,
    article: null
}

export const mutationTypes = {
    updateArticleStart: '[updateArticle] Update article start',
    updateArticleSuccess: '[updateArticle] Update article success',
    updateArticleFailure: '[updateArticle] Update article failure',
    getArticleStart: '[updateArticle] Get article start',
    getArticleSuccess: '[updateArticle] Get article success',
    getArticleFailure: '[updateArticle] Get article failure'
}

const mutations = {
    [mutationTypes.updateArticleStart](state){
        state.article = null
        state.isSubmitting = true
    },
    [mutationTypes.updateArticleFailure](state, payload){
        state.isSubmitting = false
        state.validationErrors = payload
    },
    [mutationTypes.updateArticleSuccess](state){
        state.isSubmitting = false
    },
    [mutationTypes.getArticleStart](state){
        state.isLoading = true
    },
    [mutationTypes.getArticleSuccess](state, payload){
        state.isLoading = false
        state.article = payload
    },
    [mutationTypes.getArticleFailure](state){
        state.isLoading = false
    }
}

export const actionTypes = {
    updateArticle: '[updateArticle] Update article',
    getArticle: '[updateArticle] Get article'
}

const actions = {
    [actionTypes.updateArticle](context, {slug, body}){
        return new Promise(resolve => {
            context.commit(mutationTypes.updateArticleStart)
            articleApi.updateArticle(slug, body)
                .then(article => {
                    context.commit(mutationTypes.updateArticleSuccess)
                    resolve(article)
                })
                .catch(result => {
                    context.commit(mutationTypes.updateArticleFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.getArticle](context, {slug}){
        return new Promise(resolve => {
            context.commit(mutationTypes.getArticleStart)
            articleApi.getArticle(slug)
                .then(article => {
                    context.commit(mutationTypes.getArticleSuccess, article)
                    resolve(article)
                })
                .catch(() => {
                    context.commit(mutationTypes.getArticleFailure)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}