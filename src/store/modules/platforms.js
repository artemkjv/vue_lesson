import entitiesApi from "@/api/entities";

const state = {
    data : null,
    error: false,
    isLoading: false
}

export const mutationTypes = {
    getEntitiesStart: '[platforms] getEntitiesStart',
    getEntitiesSuccess: '[platforms] getEntitiesSuccess',
    getEntitiesFailure: '[platforms] getEntitiesFailure'
}

const mutations = {
    [mutationTypes.getEntitiesStart]: state => {
        state.data = null
        state.isLoading = true
        state.error = false
    },
    [mutationTypes.getEntitiesSuccess]: (state, payload) => {
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.getEntitiesFailure]: (state) => {
        state.isLoading = false
        state.error = true
    }
}

export const actionTypes = {
    getEntities: '[platforms] getEntities'
}

const actions = {
    [actionTypes.getEntities]: (context, {apiUrl}) => {
        context.commit(mutationTypes.getEntitiesStart)
        return new Promise(resolve => {
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
    state,
    mutations,
    actions
}