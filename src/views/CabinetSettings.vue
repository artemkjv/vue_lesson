<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">

        <h1 class="text-xs-center">Your Settings</h1>
        <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>
        <form @submit.prevent="updateProfile()" class="ng-pristine ng-valid ng-valid-email">
            <fieldset class="form-group">
              <input v-model="image" class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" type="text" placeholder="URL of profile picture">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="login" class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-not-empty" type="text" placeholder="Username">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="password" class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty" type="password" placeholder="New Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting" type="submit">
              Update Settings
            </button>
        </form>

        <!-- Line break for logout button -->
        <hr>

        <button @click="logout()" class="btn btn-outline-danger">
          Or click here to logout.
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors'
import {mutationTypes} from "@/store/modules/auth";
import {actionTypes} from "@/store/modules/auth";
import {getterTypes} from "@/store/modules/auth";
import {mapGetters} from 'vuex';

export default {
  name: "CabinetSettings",
  components: {McvValidationErrors},
  data(){
    return{
      image: this.$store.state.auth.currentUser.image,
      login: this.$store.state.auth.currentUser.login,
      password: ''
    }
  },
  computed: {
    ...mapGetters({
      isSubmitting: getterTypes.isSubmitting,
      validationErrors: getterTypes.validationErrors,
    })
  },
  methods: {
    updateProfile(){
      this.$store.dispatch(actionTypes.update, {
        image: this.image,
        login: this.login,
        password: this.password
      })
    },
    logout(){
      this.$store.commit(mutationTypes.logout)
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style scoped>

</style>