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
          <label for="server_key">Server key</label>
          <input type="text" class="form-control" v-model="data.app.server_key" id="server_key" name="server_key">
        </div>
          <div class="form-group mt-3">
            <label for="sender_id">Sender Id</label>
            <input type="text" class="form-control" v-model="data.app.sender_id" id="sender_id" name="sender_id">
          </div>
          <div class="form-group mt-3">
            <div class="d-flex align-items-center">
              <img src="http://localhost/assets/images/firebase_icon.svg" width="15px" alt="Firebase">
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

export default {
  name: "AppConfig",
  computed: {
    ...mapState({
      isSubmitting: state => state.app.isSubmitting,
      data: state => state.app.data
    })
  },
  mounted() {
    let internalId = this.$route.params.internalId
    this.$store.dispatch(actionTypes.getEntity, {
      internalId: internalId
    })
  },
  methods: {
    configureApp(){
      let internalId = this.data.app.internal_id
      this.$store.dispatch(actionTypes.configureEntity, {
        internalId: internalId,
        data: {
          serverKey: this.data.app.server_key,
          senderId: this.data.app.sender_id
        }
      }).then(() => {
        this.$router.push({name: 'AppIndex'})
      })
    }
  }
}
</script>

<style scoped>

</style>