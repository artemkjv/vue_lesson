import entitiesApi from '@/api/entities'
import {LANGUAGES_URL} from "@/helpers/vars";

const state = {
    data: null,
    isLoading: false,
    error: false,
}

export const mutationTypes = {
    getEntitiesStart: '[languages] getEntitiesStart',
    getEntitiesSuccess: '[languages] getEntitiesSuccess',
    getEntitiesFailure: '[languages] getEntitiesFailure',
}

const mutations = {
    [mutationTypes.getEntitiesStart](state){
        state.isLoading = true;
        state.data = null
        state.error = false
    },
    [mutationTypes.getEntitiesSuccess](state, payload){
        state.data = payload
        state.isLoading = false
    },
    [mutationTypes.getEntitiesFailure](state){
        state.isLoading = false
        state.error = true
    },
}

export const actionTypes = {
    getEntities: '[languages] getEntities',
}

const actions  = {
    [actionTypes.getEntities](context){
        return new Promise(resolve => {
            context.commit(mutationTypes.getEntitiesStart)
            entitiesApi.getEntities(LANGUAGES_URL)
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