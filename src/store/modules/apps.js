import entitiesApi from '@/api/entities.js'

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationTypes = {
    getEntitiesStart: '[apps] getEntitiesStart',
    getEntitiesSuccess: '[apps] getEntitiesSuccess',
    getEntitiesFailure: '[apps] getEntitiesFailure'
}

const mutations = {
    [mutationTypes.getEntitiesStart](state){
        state.isLoading = true;
        state.data = null
    },
    [mutationTypes.getEntitiesStart](state, payload){
        state.data = payload
        state.isLoading = false
    },
    [mutationTypes.getEntitiesFailure](state){
        state.isLoading = false
    },
}

export const actionTypes = {
    getEntities: '[apps] getEntities'
}

const actions  = {
    [actionTypes.getEntities](context, {apiUrl}){
            return new Promise(resolve => {
                context.commit(mutationTypes.getEntitiesStart)
                entitiesApi.getEntities(apiUrl)
                    .then(response => {
                        context.commit(mutationTypes.getEntitiesSuccess, response.data)
                        resolve(response.data)
                    })
                    .catch(() => {
                        context.commit(mutationTypes.getEntitiesFailure)
                    })
            })
    }
}

export default {
    mutations,
    actions,
    state
}