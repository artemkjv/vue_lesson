<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">

        <h1 class="text-xs-center">Create Application</h1>
        <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>
        <form @submit.prevent="onSubmit()" class="ng-pristine ng-valid ng-valid-email">
            <fieldset class="form-group">
              <label for="name">
                <b>Name of your app or website</b>
              </label>
              <input v-model="name" id="name" class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" type="text">
            </fieldset>
          <p class="mb-0">
            <b>Choose your platform</b>
          </p>
          <div id="platforms" v-if="platforms" :platforms="platforms" >
            <fieldset>
              <label v-for="(platform, index) in platforms" :key="index" class="radio-image me-4">
                <input type="radio" v-model="pickedPlatform" name="platform" :value="platform.id">
                <img :src="platform.image" width="150" :alt="platform.name">
              </label>
            </fieldset>
          </div>
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
import {actionTypes as appActionTypes} from '@/store/modules/app'
import {PLATFORMS_URL} from "@/helpers/vars";
import {actionTypes as platformsActionTypes} from '@/store/modules/platforms'

export default {
  name: "AppCreate",
  components: {
    McvValidationErrors,
  },
  data(){
    return {
      name: '',
      pickedPlatform: null
    }
  },
  computed: {
    ...mapState({
      validationErrors: state => state.app.validationErrors,
      isSubmitting: state => state.app.isSubmitting,
      platforms: state => state.platforms.data
    })
  },
  methods: {
    onSubmit(){
      this.$store.dispatch(appActionTypes.createEntity, {
        name: this.name,
        platform: this.pickedPlatform
      })
    }
  },
  mounted() {
    this.$store.dispatch(platformsActionTypes.getEntities, {apiUrl: PLATFORMS_URL})
      .then(() => {
        this.$router.push({name: 'AppIndex'})
      })
  }
}
</script>

<style scoped>
.radio-image > input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-image > input + img {
  --button-radius: 4px;
  display: flex;
  -moz-box-pack: center;
  justify-content: center;
  -moz-box-align: center;
  align-items: center;
  flex-direction: column;
  transition: all 0.1s ease-in 0s;
  height: 10.75rem;
  cursor: pointer;
  padding: 0.5rem;
  color: rgb(66, 77, 87);
  background-color: rgb(255, 255, 255);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(203, 209, 215);
  border-radius: var(--button-radius);
}

.radio-image > input:checked + img {
  color: rgb(5, 27, 44);
  background-color: rgb(229, 242, 252);
  border-color: rgb(31, 143, 235);
}
</style>