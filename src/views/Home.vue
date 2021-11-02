<template>
  <div class="container">
    <div class="p-5 mb-4 bg-light rounded-3 jumbotron">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">{{ siteName }}</h1>
        <p class="col-md-8" style="padding-left: 0;">The market leading self-serve customer engagement solution for Push Notifications, Email, SMS &amp; In-App.</p>
        <router-link class="btn btn-primary btn-lg" :to="{name: 'Login'}">Get Started Now</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState({
      siteName: state => state.siteName
    })
  }
}
</script>