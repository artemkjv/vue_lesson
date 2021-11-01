import getterTypes from '@/store/modules/auth'

export default ({next, store}) => {
    console.log(store.getters[getterTypes.isLoggedIn])
    if(store.getters[getterTypes.isLoggedIn]){
        return next({
            name: 'Cabinet'
        })
    } else {
        return next()
    }

}