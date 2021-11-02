import {createStore} from 'vuex'
import auth from '@/store/modules/auth'

export default createStore({
  state: {
    siteName: 'Devonics.Push'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
  }
})
