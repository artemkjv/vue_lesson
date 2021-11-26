
<template>
  <div class="container">
    <div class="d-flex">
      <router-link :to="{name: 'SegmentCreate'}" class="btn btn-primary mb-2">New Segment</router-link>
    </div>
    <loading v-if="isLoading" />
    <error-message v-if="error" />
    <div v-if="feed">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Push Users</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(segment, index) in feed.segments" :key="index">
          <td>{{ index + 1}}</td>
          <td>{{ segment.name }}</td>
          <td>{{ segment.pushUserTotal }}</td>
          <td>
            Actions
          </td>
        </tr>
        </tbody>
      </table>

      <pagination v-if="feed.total" :total="feed.total" :limit="limit" :currentPage="currentPage" :url="baseUrl" />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from "@/store/modules/segments";
import Pagination from '@/components/Pagination';
import {PAGE_LIMIT} from "@/helpers/vars";
import {stringify, parseUrl} from 'query-string'
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import {SEGMENTS_URL} from "@/helpers/vars";

export default {
  name: "SegmentIndex",
  data(){
    return{
      limit: PAGE_LIMIT,
      apiUrl: SEGMENTS_URL
    }
  },
  components: {
    ErrorMessage,
    Loading,
    Pagination
  },
  computed: {
    ...mapState({
      isLoading: state => state.segments.isLoading,
      feed: state => state.segments.data,
      error: state => state.segments.error,
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
    },
  }
}
</script>

<style scoped>
</style>