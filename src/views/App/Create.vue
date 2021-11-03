<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">

        <h1 class="text-xs-center">Create Application</h1>
        <p>Add your app or website.</p>
        <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>
        <form @submit.prevent="onSubmit()" class="ng-pristine ng-valid ng-valid-email">
            <fieldset class="form-group">
              <label for="name">Name of your app or website</label>
              <input v-model="name" id="name" class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" type="text">
            </fieldset>
            <fieldset class="form-group">
            </fieldset>

            <fieldset class="form-group">
            </fieldset>

            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting" type="submit">
              Submit
            </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors'
import {mapState} from "vuex";
import {actionTypes} from '@/store/modules/entity'
import {PLATFORMS_URL} from "@/helpers/vars";

export default {
  name: "AppCreate",
  components: {
    McvValidationErrors
  },
  data(){
    return {
      name: ''
    }
  },
  computed: {
    ...mapState({
      validationErrors: state => state.entity.validationErrors,
      isSubmitting: state => state.entity.isSubmitting
    })
  },
  methods: {
    onSubmit(){
      this.$store.dispatch(actionTypes.getEntity, PLATFORMS_URL)
    }
  }
}
</script>

<style scoped>

</style>