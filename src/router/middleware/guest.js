export default ({next, store}) => {
    if(store.state.auth.isLoggedIn){
        return next({
            name: 'Cabinet'
        })
    } else {
        return next()
    }

}