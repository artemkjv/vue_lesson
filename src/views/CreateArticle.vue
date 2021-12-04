<template>
  <div>
    <article-form
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
import {actionTypes} from "@/store/modules/createArticle";

export default {
  name: "CreateArticle",
  data(){
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createArticle.isSubmitting,
      validationErrors: state => state.createArticle.validationErrors,
    })
  },
  methods: {
    onSubmit(data){
      this.$store.dispatch(actionTypes.createArticle, {articleInput: data})
        .then(article => {
          this.$router.push({name: 'Article', params: {slug: article.slug}})
        })
    }
  },
  components: {
    ArticleForm
  }
}
</script>

<style scoped>

</style>