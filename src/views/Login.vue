<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign In
          </h1>
          <p class="text-xs-center">
            <router-link @click="clearValidationErrors" :to="{name: 'Register'}">Need an account?</router-link>
          </p>
          <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input type="email" class="form-control form-control-lg" v-model="email" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input type="password" class="form-control form-control-lg" v-model="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import McvValidationErrors from '@/components/ValidationErrors'
import {mutationTypes} from "@/store/modules/auth";
import {actionTypes} from "@/store/modules/auth";
import {mapState} from "vuex";

export default {
  name: "VueLogin",
  data(){
    return {
      'email': '',
      'password': ''
    }
  },
  computed:{
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  components: {McvValidationErrors},
  methods: {
    onSubmit(){
      this.$store.dispatch(actionTypes.login, {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.$router.push({name: 'Home'})
      })
    },
    clearValidationErrors(){
      this.$store.commit(mutationTypes.clearValidationErrors)
    }
  }
}
</script>