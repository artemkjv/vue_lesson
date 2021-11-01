import authApi from '@/api/auth'
import {setItem} from "@/helpers/persistanceStorage";
import {removeItem} from "@/helpers/persistanceStorage";

const TOKEN_NAME = 'accessToken';

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

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure',

    logout: '[auth] logout',

    updateStart: '[auth] updateProfileStart',
    updateSuccess: '[auth] updateProfileSuccess',
    updateFailure: '[auth] updateProfileFailure',

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
    [mutationTypes.getCurrentUserStart](state){
        state.isLoading = true;
    },
    [mutationTypes.getCurrentUserSuccess](state, payload){
        state.isLoading = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    [mutationTypes.getCurrentUserFailure](state){
        state.isLoading = false
        state.isLoggedIn = false
        state.currentUser = null
    },
    [mutationTypes.logout](state){
        state.isAnonymous = true
        state.isLoggedIn = false
        state.currentUser = null
        removeItem(TOKEN_NAME)

    },
    [mutationTypes.updateStart](state){
        state.isSubmitting = true
    },
    [mutationTypes.updateSuccess](state, payload){
        state.currentUser = payload
        state.isSubmitting = false
    },
    [mutationTypes.updateFailure](state, payload){
        state.isSubmitting = false
        state.validationErrors = payload
    }
}

export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
    update: '[auth] update'
}

const actions = {
    [actionTypes.register](context, credentials){
        return new Promise(resolve => {
            context.commit(mutationTypes.registerStart)
            authApi.register(credentials)
                .then(response => {
                    context.commit(mutationTypes.registerSuccess, response.data.user)
                    setItem(TOKEN_NAME, response.data.user.token)
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
                    setItem(TOKEN_NAME, response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(mutationTypes.loginFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.getCurrentUser](context){
        return new Promise(resolve => {
            context.commit(mutationTypes.getCurrentUserStart)
            authApi
                .getCurrentUser()
                .then(response => {
                    context.commit(mutationTypes.getCurrentUserSuccess, response.data.user)
                    resolve(response.data.user)
                })
                .catch(() => {
                    context.commit(mutationTypes.getCurrentUserFailure)
                })
        })
    },
    [actionTypes.update](context, data){
        return new Promise(resolve => {
            context.commit(mutationTypes.updateStart)
            authApi.update(data)
                .then(response => {
                    context.commit(mutationTypes.updateSuccess, response.data.user)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(mutationTypes.updateFailure, result.response.data.errors)
                })

        })
    }
}

export const getterTypes = {
    currentUser: '[auth] currentUser',
    isLoggedIn: '[auth] isLoggedIn',
    isAnonymous: '[auth] isAnonymous',
    isSubmitting: '[auth] isSubmitting',
    validationErrors: '[auth] validationErrors'
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
    },
    [getterTypes.isSubmitting]: state => {
        return state.isSubmitting
    },
    [getterTypes.validationErrors]: state => {
        return state.validationErrors
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}