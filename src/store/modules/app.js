import entityApi from '@/api/entity'
import {
    CONFIGURE_APP_URL,
    CREATE_APP_URL,
    DELETE_APP_URL,
    REPLACE_REGEX,
    VIEW_APP_URL
} from "@/helpers/vars";

const state = {
    validationErrors: null,
    data: null,
    isSubmitting: false,
    isLoading: false
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
    deleteEntityFailure: '[app] deleteEntityFailure',
    configureEntityStart: '[app] configureEntityStart',
    configureEntitySuccess: '[app] configureEntitySuccess',
    configureEntityFailure: '[app] configureEntityFailure'
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
    [mutationTypes.configureEntityStart]: (state) => {
        state.isSubmitting = true
    },
    [mutationTypes.configureEntitySuccess]: (state, data) => {
        state.isSubmitting = false
        state.data = data
    },
    [mutationTypes.configureEntityFailure]: (state, errors) => {
        state.isSubmitting = false
        state.validationErrors = errors
    }
}

export const actionTypes = {
    getEntity: '[app] getEntity',
    createEntity: '[app] createEntity',
    deleteEntity: '[app] deleteEntity',
    configureEntity: '[app] configureEntity'
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
        let apiUrl = DELETE_APP_URL.replace(REPLACE_REGEX, internalId)
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
    [actionTypes.configureEntity]: (context, {internalId, data}) => {
        context.commit(mutationTypes.configureEntityStart)
        let apiUrl = CONFIGURE_APP_URL.replace(REPLACE_REGEX, internalId)
        return new Promise(resolve => {
            entityApi.editEntity(apiUrl, data)
                .then(response => {
                    context.commit(mutationTypes.configureEntitySuccess, response.data)
                    resolve(response.data)
                })
                .catch(result => {
                    console.log(result.response.data.errors)
                    context.commit(mutationTypes.configureEntityFailure, result.response.data.errors)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}