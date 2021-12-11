<template>
  <div>
    <loading v-if="isLoading" />
    <article-form
        v-if="article"
        :initial-values="initialValues"
        :errors="validationErrors"
        :is-submitting="isSubmitting"
        @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import ArticleForm from "@/components/ArticleForm";
import {mapState} from 'vuex'
import {actionTypes} from "@/store/modules/editArticle";
import Loading from "@/components/Loading";

export default {
  name: "EditArticle",
  computed: {
    ...mapState({
      isSubmitting: state => state.editArticle.isSubmitting,
      validationErrors: state => state.editArticle.validationErrors,
      isLoading: state => state.editArticle.isLoading,
      article: state => state.editArticle.article
    }),
    initialValues(){
      if(!this.article)
        return {
          title: '',
          description: '',
          body: '',
          tagList: []
        }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList
      }
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {slug: this.$route.params.slug})
  },
  methods: {
    onSubmit(data){
      this.$store.dispatch(actionTypes.updateArticle, {slug: this.article.slug, body: {article: data}})
          .then(article => {
            this.$router.push({name: 'Article', params: {slug: article.slug}})
          })
    }
  },
  components: {
    Loading,
    ArticleForm
  }
}
</script>

<style scoped>

</style>