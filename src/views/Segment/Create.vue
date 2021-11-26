<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">

        <h1 class="text-xs-center">Create Segment</h1>
        <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>
        <form @submit.prevent="onSubmit()" class="ng-pristine ng-valid ng-valid-email">
          <fieldset class="form-group">
            <label for="name">
              <b>Name of your Segment</b>
            </label>
            <input v-model="segment.name" id="name" class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" type="text">
          </fieldset>
          <div class="filter-types-wrapper">
            <div class="filter-type" v-for="(filterType, index) in filterTypes" :key="index">
                  <div class="title">{{filterType.title}}</div>
                    <select class="form-control" name="predicate">
                      <option
                          v-for="(predicate, predicateKey) in filterType.predicates"
                          :key="predicateKey"
                          :value="predicate.value"
                      >
                        {{ predicate.name }}
                      </option>
                    </select>
                    <select v-if="filterType.option" :name="index">
                      {{ filterType.data() }}
                    </select>
                </div>
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
import {actionTypes} from '@/store/modules/segment'
import {FILTER_TYPES} from "@/helpers/vars";
import {actionTypes as countriesActionTypes} from '@/store/modules/countries';
import {actionTypes as languagesActionTypes} from '@/store/modules/languages';
import {actionTypes as platformsActionTypes} from '@/store/modules/platforms'

export default {
  name: "SegmentCreate",
  components: {
    McvValidationErrors,
  },
  data(){
    return {
      filterTypes: FILTER_TYPES
    }
  },
  computed: {
    ...mapState({
      validationErrors: state => state.segment.validationErrors,
      isSubmitting: state => state.segment.isSubmitting,
      segment: state => state.segment.data.segment,
      countries: state => state.countries.data,
      languages: state => state.languages.data,
      platforms: state => state.platforms.data
    }),
  },
  methods: {
    onSubmit(){
      this.$store.dispatch(actionTypes.createEntity, {
        name: this.segment.name,
      }).then(data => {
        console.log(data)
        this.$router.push({name: 'SegmentIndex'})
      })
    }
  },
  mounted() {
    this.$store.dispatch(countriesActionTypes.getEntities)
    this.$store.dispatch(languagesActionTypes.getEntities)
    this.$store.dispatch(platformsActionTypes.getEntities)
  }
}
</script>

<style scoped>

</style>