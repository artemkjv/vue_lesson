<template>
  <div class="container">
    <div v-if="data" class="content-wrapper form-wrapper content-border">
      <div class="content-header">
        <div class="title">
          <h2>Google (FCM) Configuration</h2>
        </div>
        <div class="description">
          <p>Now, let's configure your app.</p>
        </div>
      </div>
      <div class="content-body">
        <form @submit.prevent="configureApp">
          <div class="form-group">
          <label for="serverKey">Server key</label>
          <input type="text" class="form-control" v-model="data.app.serverKey" id="serverKey" name="serverKey">
        </div>
          <div class="form-group mt-3">
            <label for="senderId">Sender Id</label>
            <input type="text" class="form-control" v-model="data.app.senderId" id="senderId" name="senderId">
          </div>
          <div class="form-group mt-3">
            <div class="d-flex align-items-center">
              <img :src="baseUrl + '/assets/images/firebase-icon.svg'" id="firebase-icon" alt="Firebase">
              <a href="https://console.firebase.google.com/" class="non-underline" style="margin: 2px 0 0 5px;">Copy from your Firebase Console</a>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mt-3" :disabled="isSubmitting">Submit</button>
        </form>
      </div>
      <div class="content-footer">

      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes} from "@/store/modules/app";
import {mapState} from "vuex";
import {BASE_URL} from "@/helpers/vars";

export default {
  name: "AppConfig",
  computed: {
    ...mapState({
      isSubmitting: state => state.app.isSubmitting,
      data: state => state.app.data
    }),
    baseUrl(){
      return BASE_URL
    }
  },
  mounted() {
    let internalId = this.$route.params.internalId
    this.$store.dispatch(actionTypes.getEntity, {
      internalId: internalId
    })
  },
  methods: {
    configureApp(){
      let internalId = this.data.app.internalId
      this.$store.dispatch(actionTypes.configureEntity, {
        internalId: internalId,
        data: {
          serverKey: this.data.app.serverKey,
          senderId: this.data.app.senderId
        }
      }).then(() => {
        this.$router.push({name: 'AppIndex'})
      })
    }
  }
}
</script>

<style scoped>
#firebase-icon{
  width: 20px;
}
</style>