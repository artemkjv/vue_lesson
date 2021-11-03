import {createStore} from 'vuex'
import auth from '@/store/modules/auth'
import apps from '@/store/modules/apps'
import entity from '@/store/modules/entity'

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
    entity
  }
})
