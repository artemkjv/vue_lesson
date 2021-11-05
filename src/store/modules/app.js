import entityApi from '@/api/entity'
import {CREATE_APP_URL} from "@/helpers/vars";

const state = {
    validationErrors: null,
    data: null,
    isSubmitting: false
}

export const mutationTypes ={
    getEntityStart: '[app] getEntityStart',
    getEntitySuccess: '[app] getEntitySuccess',
    getEntityFailure: '[app] getEntityFailure',
    createEntityStart: '[app] createEntityStart',
    createEntitySuccess: '[app] createEntitySuccess',
    createEntityFailure: '[app] createEntityFailure'
}

const mutations = {
    [mutationTypes.getEntityStart]: () => {
        state.data = null
    },
    [mutationTypes.getEntitySuccess]: (state, payload) => {
        state.isSubmitting = false
        state.data = payload
    },
    [mutationTypes.getEntityFailure]: (state, errors) => {
        state.validationErrors = errors
    },
    [mutationTypes.createEntityStart]: state => {
        state.isSubmitting = true
    },
    [mutationTypes.createEntitySuccess]: state => {
        state.isSubmitting = false
    },
    [mutationTypes.createEntityFailure]: (state, errors) => {
        state.isSubmitting = false
        state.validationErrors = errors
    }
}

export const actionTypes = {
    getEntity: '[app] getEntity',
    createEntity: '[app] createEntity'
}

const actions = {
    [actionTypes.getEntity]: (context, {apiUrl}) => {
        context.commit(mutationTypes.getEntityStart)
        return new Promise(resolve => {
            entityApi.getEntity(apiUrl)
                .then(response => {
                    context.commit(mutationTypes.getEntitySuccess, response.data)
                    resolve(response.data)
                })
                .catch(result => {
                    context.commit(mutationTypes.getEntityFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.createEntity]: (context, data) => {
        context.commit(mutationTypes.createEntityStart)
        return new Promise(() => {
            entityApi.createEntity(CREATE_APP_URL, data)
                .then(resolve => {
                    context.commit(mutationTypes.createEntitySuccess)
                    resolve()
                })
                .catch(result => {
                    context.commit(mutationTypes.createEntityFailure, result.response.data.errors)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}