<template>
  <div>
    <loading v-if="isLoading" />
    <error-message v-if="error" />
    <div v-if="feed">
      <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
        <div class="article-meta">
          <router-link :to="{name: 'UserProfile', params: {slug: article.author.username}}">
            <img :src="article.author.image" alt="Author Avatar">
          </router-link>
          <div class="info">
            <router-link class="author" :to="{name: 'UserProfile', params: {slug: article.author.username}}">
              {{article.author.username}}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <btn-favorites
                :is-favorite="article.favorited"
                :article-slug="article.slug"
                :favorites-count="article.favoritesCount"
            />
          </div>
        </div>
        <router-link :to="{name: 'Article', params: {slug: article.slug}}" class="preview-link">
          <h1>{{article.title}}</h1>
          <p>{{article.description}}</p>
          <span>Read more...</span>
          <tag-list :tags="article.tagList" />
        </router-link>
      </div>
      <mcv-pagination :total="feed.articlesCount" :limit="limit" :currentPage="currentPage" :url="baseUrl" />
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from "@/store/modules/feed";
import McvPagination from '@/components/Pagination';
import {PAGE_LIMIT} from "@/helpers/vars";
import {stringify, parseUrl} from 'query-string'
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import TagList from "@/components/TagList";
import BtnFavorites from "@/components/BtnFavorites";

export default {
  name: "Feed",
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      limit: PAGE_LIMIT,
    }
  },
  components: {
    BtnFavorites,
    TagList,
    ErrorMessage,
    McvPagination,
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
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
    },
    apiUrl(){
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
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: assembledUrl})
    }
  }
}
</script>

<style scoped>

</style>