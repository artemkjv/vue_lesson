import {createStore} from 'vuex'
import auth from '@/store/modules/auth'
import apps from '@/store/modules/apps'
import app from '@/store/modules/app'
import platforms from '@/store/modules/platforms'

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
    apps,
    app,
    platforms
  }
})
