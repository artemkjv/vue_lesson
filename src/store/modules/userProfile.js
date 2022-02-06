import userProfileApi from "@/api/userProfile";

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationTypes = {
    getUserProfileStart: '[user] Get profile start',
    getUserProfileFailure: '[user] Get profile failure',
    getUserProfileSuccess: '[user] Get profile success',
}

const mutations = {
    [mutationTypes.getUserProfileStart](state){
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.getUserProfileSuccess](state, payload){
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.getUserProfileFailure](state){
        state.isLoading = false
    }
}

export const actionTypes = {
    getProfile: '[user] Get profile'
}

const actions = {
    [actionTypes.getProfile](context, {slug}){
        return new Promise(resolve => {
            context.commit(mutationTypes.getUserProfileStart)
            userProfileApi.getUserProfile(slug)
                .then(profile => {
                    context.commit(mutationTypes.getUserProfileSuccess, profile)
                    resolve(profile)
                })
                .catch(() => {
                    context.commit(mutationTypes.getUserProfileFailure)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}