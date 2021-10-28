import authApi from '@/api/auth'
import {setItem} from "@/helpers/persistanceStorage";

const state = {
    isSubmitting: false,
    isLoading: true,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
}

export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    clearValidationErrors: '[auth] clearValidationErrors',

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',
    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure'
}

const mutations = {
    [mutationTypes.registerStart](state){
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.registerFailure](state, payload){
        state.isSubmitting = false
        state.validationErrors = payload
    },
    [mutationTypes.registerSuccess](state, payload){
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationTypes.clearValidationErrors](state){
        state.validationErrors = null
    },
    [mutationTypes.loginStart](state){
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.loginFailure](state, payload){
        state.isSubmitting = false
        state.validationErrors = payload
    },
    [mutationTypes.loginSuccess](state, payload){
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
}

export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login'
}

const actions = {
    [actionTypes.register](context, credentials){
        return new Promise(resolve => {
            context.commit(mutationTypes.registerStart)
            authApi.register(credentials)
                .then(response => {
                    context.commit(mutationTypes.registerSuccess, response.data.user)
                    setItem('accessToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(mutationTypes.registerFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.login](context, credentials){
        return new Promise(resolve => {
            context.commit(mutationTypes.loginStart)
            authApi.login(credentials)
                .then(response => {
                    context.commit(mutationTypes.loginSuccess, response.data.user)
                    setItem('accessToken', response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(mutationTypes.loginFailure, result.response.data.errors)
                })
        })
    }
}

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous'
}

const getters = {
    [getterTypes.currentUser]: state => {
        return state.currentUser;
    },
    [getterTypes.isLoggedIn]: state => {
        return Boolean(state.isLoggedIn);
    },
    [getterTypes.isAnonymous]: state => {
        return state.isLoggedIn === false
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}