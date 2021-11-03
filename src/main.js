import {createApp} from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import {actionTypes} from "@/store/modules/auth";

Promise.race([
    store.dispatch(actionTypes.getCurrentUser),
    new Promise((rs) => setTimeout(rs, 2000))
]).then(() => {
    const app = createApp(App)
        .use(router)
        .use(store)
    app.mount('#app')
})