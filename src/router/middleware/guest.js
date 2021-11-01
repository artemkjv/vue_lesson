import {getterTypes} from '@/store/modules/auth'

export default ({next, store}) => {
    if(store.getters[getterTypes.isLoggedIn]){
        return next({
            name: 'Cabinet'
        })
    } else {
        return next()
    }

}