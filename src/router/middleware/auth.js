export default ({next, store}) => {
    if(store.state.auth.isAnonymous){
        return next({
            name: 'Login'
        })
    } else {
        return next()
    }
}