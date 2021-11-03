
<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happened</div>
    <div v-if="feed">
      <div class="app-row" v-for="(app, index) in feed.apps" :key="index">
        app
      </div>
      <pagination :total="101" :limit="limit" :currentPage="currentPage" :url="baseUrl" />
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from "@/store/modules/apps";
import Pagination from '@/components/Pagination';
import {PAGE_LIMIT} from "@/helpers/vars";
import {stringify, parseUrl} from 'query-string'
export default {
  name: "Apps",
  data(){
    return{
      total: 500,
      limit: PAGE_LIMIT,
      apiUrl: '/app/index'
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapState({
      isLoading: state => state.apps.isLoading,
      feed: state => state.apps.data,
      error: state => state.apps.error
    }),
    currentPage(){
      return Number(this.$route.query.page || '1')
    },
    baseUrl(){
      return this.$route.path
    },
    offset(){
      return this.currentPage * this.limit - this.limit;
    }
  },
  watch: {
    currentPage(){
      this.fetchFeed()
    }
  },
  mounted() {
    this.fetchFeed()
  },
  methods: {
    fetchFeed(){
      const parsedUrl =  parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit: this.limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const assembledUrl = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getEntities, {apiUrl: assembledUrl})
    }
  }
}
</script>

<style scoped>
</style>