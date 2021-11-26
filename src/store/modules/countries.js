import entitiesApi from '@/api/entities'
import {COUNTRIES_URL} from "@/helpers/vars";

const state = {
    data: null,
    isLoading: false,
    error: false,
}

export const mutationTypes = {
    getEntitiesStart: '[countries] getEntitiesStart',
    getEntitiesSuccess: '[countries] getEntitiesSuccess',
    getEntitiesFailure: '[countries] getEntitiesFailure',
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
    getEntities: '[countries] getEntities',
}

const actions  = {
    [actionTypes.getEntities](context){
        return new Promise(resolve => {
            context.commit(mutationTypes.getEntitiesStart)
            entitiesApi.getEntities(COUNTRIES_URL)
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