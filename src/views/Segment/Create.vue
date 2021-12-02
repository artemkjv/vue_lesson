<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-9 col-xs-12">
        <h1 class="text-xs-center">Create Segment</h1>
        <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>
        <form @submit.prevent="onSubmit()" class="ng-pristine ng-valid ng-valid-email">
          <fieldset class="form-group">
            <label for="name">
              <b>Name of your Segment</b>
            </label>
            <input v-model="segment.name" id="name" class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" type="text">
          </fieldset>

          <div class="filters-wrapper" v-if="countries && languages && platforms">
            <div class="filters">
              <div class="filter" v-for="(filter, index) in addedFilters" :key="index">
                <div class="title">{{filter.title}}</div>
                <select class="form-control" name="predicate" v-model="filter.predicates[i]">
                  <option
                      v-for="(predicate, predicateKey) in filter.predicates"
                      :key="predicateKey"
                      :value="predicate.value"
                  >
                    {{ predicate.name }}
                  </option>
                </select>
                <select v-if="filter.option" :name="index">
                  <option :value="entity.id" v-for="entity in filter.data(this.$store.state)" :key="entity">{{ entity.name }}</option>
                </select>
              </div>
            </div>
            <div class="filter-type" v-for="(filterType, index) in filterTypes" :key="index">
              <a type="button" class="filter-add-button mt-2 non-underline" @click="addFilter(filterType)">
                <div class="filter-name">
                  {{ filterType.title }}
                </div>
                <div class="filter-description">
                  {{ filterType.description }}
                </div>
                <div class="filter-icon">
                  +
                </div>
              </a>

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
import {mutationTypes} from "@/store/modules/segment";

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
      platforms: state => state.platforms.data,
      addedFilters: state => state.segment.addedFilters
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
    },
    addFilter(filterType){
      this.$store.commit(mutationTypes.addFilter, filterType)
    }
  },
  mounted() {
    this.$store.dispatch(countriesActionTypes.getEntities)
    this.$store.dispatch(languagesActionTypes.getEntities)
    this.$store.dispatch(platformsActionTypes.getEntities)
  },
}
</script>

<style scoped>


</style>