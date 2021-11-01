import getterTypes from '@/store/modules/auth'

export default ({next, store}) => {
    if(store.getters[getterTypes.isAnonymous]){
        return next({
            name: 'Login'
        })
    } else {
        return next()
    }
}