import {createStore} from 'vuex'
import auth from '@/store/modules/auth'
import apps from '@/store/modules/apps'
import app from '@/store/modules/app'
import platforms from '@/store/modules/platforms'
import segments from '@/store/modules/segments'
import segment from "@/store/modules/segment";
import countries from '@/store/modules/countries'
import languages from '@/store/modules/languages'

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
    platforms,
    segments,
    segment,
    countries,
    languages
  }
})
