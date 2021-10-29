<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign Up
          </h1>
          <p class="text-xs-center">
            <router-link @click="clearValidationErrors" :to="{name: 'Login'}">Have an account?</router-link>
          </p>
          <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"></mcv-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input type="text" class="form-control form-control-lg" placeholder="Username" v-model="login">
            </fieldset>
            <fieldset class="form-group">
              <input type="text" class="form-control form-control-lg" placeholder="Email" v-model="email">
            </fieldset>
            <fieldset class="form-group">
              <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="password">
            </fieldset>
            <fieldset class="form-group">
              <input type="password" class="form-control form-control-lg" placeholder="Password Confirmation" v-model="password_confirmation">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import McvValidationErrors from '@/components/ValidationErrors';
  import {actionTypes, mutationTypes} from "@/store/modules/auth";

  export default {
    name: "VueRegister",
    components: {
      McvValidationErrors
    },
    data(){
      return {
        login: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    },
    computed: {
      ...mapState({
        isSubmitting: state => state.auth.isSubmitting,
        validationErrors: state => state.auth.validationErrors
      })
    },
    methods: {
      onSubmit(){
        this.$store.dispatch(actionTypes.register, {
          email: this.email,
          login: this.login,
          password: this.password,
          password_confirmation: this.password_confirmation
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