<template>
<div class="container">
  <div v-if="isLoading">Loading...</div>
  <div v-if="data" class="content-wrapper form-wrapper content-border">
    <div class="content-header">
      <div class="title">
        <h2>{{ data.app.title }}</h2>
      </div>
    </div>
    <div class="content-body">
      <p class="mb-5">Your App ID: {{data.app.internal_id}}</p>
      <h3>Test for Subscribed Users</h3>
      <p class="mb-4 mt-3">Build and run your app. The Push SDK, once set up correctly, will automatically handle subscribing your device to notifications.</p>
    </div>
    <div class="content-footer">
      <button type="button" class="btn btn-danger float-right" @click="removeApp" :disabled="isSubmitting">Remove</button>
    </div>
  </div>
</div>
</template>

<script>
import {actionTypes} from "@/store/modules/app";
import {mapState} from 'vuex';

export default {
  name: "AppView",
  computed: {
    ...mapState({
      data: state => state.app.data,
      isLoading: state => state.app.isLoading,
      isSubmitting: state => state.app.isSubmitting
    })
  },
  mounted() {
    let internalId = this.$route.params.internalId
    this.$store.dispatch(actionTypes.getEntity, {
      internalId: internalId
    })
  },
  methods: {
    removeApp(){
      this.$store.dispatch(actionTypes.deleteEntity,{
        internalId: this.data.app.internal_id
      })
      .then(() => {
        this.$router.push({name: 'AppIndex'})
      })
    },
  }
}
</script>

<style scoped>

</style>