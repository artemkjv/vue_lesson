<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <mcv-validation-errors v-if="validationErrors" validation-errors="validation-errors"/>
          <form @submit.prevent="onSubmit">
            <fieldset>

              <fieldset class="form-group">
                <input
                    placeholder="Username"
                    type="text"
                    class="form-control form-control-lg"
                    v-model="form.username"
                >
              </fieldset>

              <fieldset class="form-group">
                <input
                    placeholder="Email"
                    type="email"
                    class="form-control form-control-lg"
                    v-model="form.email"
                >
              </fieldset>

              <fieldset class="form-group">
                <input
                    placeholder="URL of profile picture"
                    type="text"
                    class="form-control form-control-lg"
                    v-model="form.image"
                >
              </fieldset>

              <fieldset class="form-group">
                <textarea
                    class="form-control form-control-lg"
                    v-model="form.bio"
                    placeholder="Short bio about you"
                ></textarea>
              </fieldset>

              <fieldset class="form-group">
                <input
                    placeholder="Password"
                    type="password"
                    class="form-control form-control-lg"
                    v-model="form.password"
                >
              </fieldset>

              <button type="submit" class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting">Update Settings</button>

            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import McvValidationErrors from "@/components/ValidationErrors";
import {actionTypes} from '@/store/modules/auth'

export default {
  name: "Settings",
  components: {McvValidationErrors},
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isLoading,
      validationErrors: state => state.auth.validationErrors,
      currentUser: state => state.auth.currentUser
    }),
    form(){
      return {
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        image: this.currentUser.image,
        email: this.currentUser.email,
        password: ''
      }
    }
  },
  methods: {
    onSubmit(){
      console.log('submitted form', this.form)
      this.$store.dispatch(actionTypes.updateCurrentUser, this.form)
    },
    logout(){
      this.$store.dispatch(actionTypes.logout)
        .then(() => {
          this.$router.push({name: 'GlobalFeed'})
        })
    }
  }
}
</script>

<style scoped>

</style>