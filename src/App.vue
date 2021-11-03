<template>
  <div id="app">
    <mcv-top-bar />
    <sidebar v-if="isLoggedIn" />
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>
<script>
import McvTopBar from '@/components/Topbar'
import {getterTypes} from '@/store/modules/auth'
import {mapGetters} from 'vuex'
import Sidebar from "@/components/Sidebar"

export default {
  name: 'McvApp',
  components: {
    McvTopBar,
    Sidebar
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn,
    }),
  }
}
</script>