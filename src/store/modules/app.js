import entityApi from '@/api/entity'
import {
    CREATE_APP_URL,
    DELETE_APP_URL,
    REPLACE_REGEX,
    VIEW_APP_URL
} from "@/helpers/vars";

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
    createEntityFailure: '[app] createEntityFailure',
    deleteEntityStart: '[app] deleteEntityStart',
    deleteEntitySuccess: '[app] deleteEntitySuccess',
    deleteEntityFailure: '[app] deleteEntityFailure'
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
    },
    deleteEntityStart: (state) => {
        state.isSubmitting = true
    },
    deleteEntitySuccess: (state) => {
        state.isSubmitting = false
    },
    deleteEntityFailure: (state) => {
        state.isSubmitting = false
    }
}

export const actionTypes = {
    getEntity: '[app] getEntity',
    createEntity: '[app] createEntity',
    deleteEntity: '[app] deleteEntity'
}

const actions = {
    [actionTypes.getEntity]: (context, {internalId}) => {
        context.commit(mutationTypes.getEntityStart)
        let apiUrl = VIEW_APP_URL.replace(REPLACE_REGEX, internalId)
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
        return new Promise(resolve => {
            entityApi.createEntity(CREATE_APP_URL, data)
                .then(() => {
                    context.commit(mutationTypes.createEntitySuccess)
                    resolve()
                })
                .catch(result => {
                    context.commit(mutationTypes.createEntityFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.deleteEntity]: (context, {internalId}) => {
        context.commit(mutationTypes.deleteEntityStart)
        let apiUrl = DELETE_APP_URL.replace(REPLACE_REGEX, internalId)
        return new Promise(resolve => {
            entityApi.deleteEntity(apiUrl)
                .then(() => {
                    context.commit(mutationTypes.deleteEntitySuccess)
                    resolve()
                })
                .catch(result => {
                    console.log(result.response.data.errors)
                    context.commit(mutationTypes.deleteEntityFailure)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}