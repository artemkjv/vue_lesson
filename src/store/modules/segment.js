import entityApi from '@/api/entity'
import {
    CREATE_SEGMENT_URL,
    REPLACE_REGEX,
    VIEW_SEGMENT_URL,
    DELETE_SEGMENT_URL
} from "@/helpers/vars";

const state = {
    validationErrors: null,
    data: {
        segment: {
            name: '',
            rules: [

            ]
        }
    },
    isSubmitting: false,
    isLoading: false
}

export const mutationTypes ={
    getEntityStart: '[segment] getEntityStart',
    getEntitySuccess: '[segment] getEntitySuccess',
    getEntityFailure: '[segment] getEntityFailure',
    createEntityStart: '[segment] createEntityStart',
    createEntitySuccess: '[segment] createEntitySuccess',
    createEntityFailure: '[segment] createEntityFailure',
    deleteEntityStart: '[segment] deleteEntityStart',
    deleteEntitySuccess: '[segment] deleteEntitySuccess',
    deleteEntityFailure: '[segment] deleteEntityFailure',
}

const mutations = {
    [mutationTypes.getEntityStart]: () => {
        state.data = null
        state.isLoading = true
    },
    [mutationTypes.getEntitySuccess]: (state, payload) => {
        state.data = payload
        state.isLoading = false
    },
    [mutationTypes.getEntityFailure]: (state, errors) => {
        state.validationErrors = errors
        state.isLoading = false
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
    [mutationTypes.deleteEntityStart]: (state) => {
        state.isSubmitting = true
    },
    [mutationTypes.deleteEntitySuccess]: (state) => {
        state.isSubmitting = false
    },
    [mutationTypes.deleteEntityFailure]: (state) => {
        state.isSubmitting = false
    },
}

export const actionTypes = {
    getEntity: '[segment] getEntity',
    createEntity: '[segment] createEntity',
    deleteEntity: '[segment] deleteEntity',
}

const actions = {
    [actionTypes.getEntity]: (context, {id}) => {
        context.commit(mutationTypes.getEntityStart)
        let apiUrl = VIEW_SEGMENT_URL.replace(REPLACE_REGEX, id)
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
            entityApi.createEntity(CREATE_SEGMENT_URL, data)
                .then(response => {
                    context.commit(mutationTypes.createEntitySuccess)
                    resolve(response.data)
                })
                .catch(result => {
                    context.commit(mutationTypes.createEntityFailure, result.response.data.errors)
                })
        })
    },
    [actionTypes.deleteEntity]: (context, {internalId}) => {
        context.commit(mutationTypes.deleteEntityStart)
        let apiUrl = DELETE_SEGMENT_URL.replace(REPLACE_REGEX, internalId)
        return new Promise(resolve => {
            entityApi.deleteEntity(apiUrl)
                .then(() => {
                    context.commit(mutationTypes.deleteEntitySuccess)
                    resolve()
                })
                .catch(() => {
                    context.commit(mutationTypes.deleteEntityFailure)
                })
        })
    },
}

export default {
    state,
    mutations,
    actions
}