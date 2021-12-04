<template>
<div>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{article.title}}</h1>
        <div class="article-meta">
          <router-link :to="{name: 'UserProfile', params: {slug: article.author.username}}">
            <img :src="article.author.image" :alt="article.author.username">
          </router-link>
          <div class="info">
            <router-link :to="{name: 'UserProfile', params: {slug: article.author.username}}">
              {{article.author.username}}
            </router-link>
            <span class="date">
              {{article.createdAt}}
            </span>
          </div>
          <span v-if="isAuthor">
            <router-link class="btn btn-outline-secondary btn-small" :to="{name: 'EditArticle', params: {slug: article.slug}}">
              <i class="ion-edit" />
              Edit Article
            </router-link>
            <button class="btn btn-outline-danger btn-small" @click="deleteArticle">
              <i class="ion-trash-a" />
              Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="container page">
    <loading v-if="isLoading" />
    <error-message v-if="error" />
    <div class="row article-content" v-if="article">
      <div class="col-xs-12">
        <div>
          <p>{{article.body}}</p>
        </div>
        <tag-list :tags="article.tagList" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {actionTypes as articleActionTypes} from '@/store/modules/article'
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'
import {getterTypes as authGetterTypes} from "@/store/modules/auth";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import TagList from "@/components/TagList";

export default {
  name: "Article",
  components: {TagList, ErrorMessage, Loading},
  computed:{
    slug(){
      return this.$route.params.slug
    },
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data
    }),
    ...mapGetters({
      isLoggedIn: authGetterTypes.isLoggedIn,
      currentUser: authGetterTypes.currentUser
    }),
    isAuthor(){
      if(!this.currentUser || !this.article){
        return false
      }
      return this.currentUser.username === this.article.author.username
    }
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {slug: this.slug})
  },
  methods: {
    deleteArticle(){
      this.$store
          .dispatch(
              articleActionTypes.deleteArticle,
              {slug: this.slug}
          ).then(() => {
            this.$router.push({name: 'GlobalFeed'})
           })
    }
  }
}
</script>

<style scoped>

</style>