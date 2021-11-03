
<template>
  <div class="container">
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happened</div>
    <div v-if="feed">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(app, index) in feed.apps" :key="index">
          <th scope="row">{{ index + 1}}</th>
          <td colspan="2">{{ app.title }}</td>
        </tr>
        </tbody>
      </table>

      <pagination v-if="feed.total" :total="feed.total" :limit="limit" :currentPage="currentPage" :url="baseUrl" />
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
      error: state => state.apps.error,
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