import articleApi from '@/api/article'

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationTypes = {
    getArticleStart: '[article] Get article start',
    getArticleSuccess: '[article] Get article success',
    getArticleFailure: '[article] Get article failure',
    deleteArticleStart: '[article] Delete article start',
    deleteArticleSuccess: '[article] Delete article success',
    deleteArticleFailure: '[article] Delete article failure',
    addToFavoritesStart: '[article] Add to favorites start',
    addToFavoritesSuccess: '[article] Add to favorites success',
    addToFavoritesFailure: '[article] Add to favorites failure',
}

export const actionTypes = {
    getArticle: '[article] Get article',
    deleteArticle: '[article] Delete article',
    addToFavorites: '[article] Add to favorites'
}

const mutations = {
    [mutationTypes.getArticleStart](state){
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.getArticleSuccess](state, payload){
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.getArticleFailure](state){
        state.isLoading = false
    },
    [mutationTypes.deleteArticleStart](){},
    [mutationTypes.deleteArticleSuccess](){},
    [mutationTypes.deleteArticleFailure](){},
    [mutationTypes.addToFavoritesStart](){},
    [mutationTypes.addToFavoritesSuccess](){},
    [mutationTypes.addToFavoritesFailure](){}
}

const actions = {
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
    },
    [actionTypes.deleteArticle](context, {slug}){
        return new Promise(resolve => {
            context.commit(mutationTypes.deleteArticleStart)
            articleApi.deleteArticle(slug)
                .then(() => {
                    context.commit(mutationTypes.deleteArticleSuccess)
                    resolve()
                })
                .catch(() => {
                    context.commit(mutationTypes.deleteArticleFailure)
                })
        })
    },
    [actionTypes.addToFavorites](context, {slug, isFavorite}){
        return new Promise(resolve => {
            context.commit(mutationTypes.addToFavoritesStart)
            const promise = isFavorite
                ? articleApi.removeFromFavorites(slug)
                : articleApi.addToFavorites(slug)
            promise
                .then(article => {
                    context.commit(mutationTypes.addToFavoritesSuccess)
                    resolve(article)
                })
                .catch(() => {
                    context.commit(mutationTypes.addToFavoritesFailure)
                })
        })
    }

}

export default {
    state,
    mutations,
    actions
}