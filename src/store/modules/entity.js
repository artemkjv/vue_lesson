import entityApi from '@/api/entity'

const state = {
    validationErrors: null,
    data: null,
    isSubmitting: false
}

export const mutationTypes ={
    getEntityStart: '[entity] getEntityStart',
    getEntitySuccess: '[entity] getEntitySuccess',
    getEntityFailure: '[entity] getEntityFailure'
}

const mutations = {
    [mutationTypes.getEntityStart]: state => {
        state.isSubmitting = true
    },
    [mutationTypes.getEntitySuccess]: (state, payload) => {
        state.isSubmitting = false
        state.data = payload
    },
    [mutationTypes.getEntityFailure]: (state, errors) => {
        state.isSubmitting = false
        state.validationErrors = errors
    }
}

export const actionTypes = {
    getEntity: '[entity] getEntity'
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
    }
}

export default {
    state,
    mutations,
    actions
}