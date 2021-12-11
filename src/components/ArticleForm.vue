<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <mcv-validation-errors v-if="errors" :validation-errors="errors" />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                    placeholder="Title"
                    type="text"
                    class="form-control form-control-lg"
                    v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                    placeholder="Description"
                    type="text"
                    class="form-control form-control-lg"
                    v-model="description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                    placeholder="What is this article about?"
                    class="form-control form-control-lg"
                    v-model="body"
                >
                  </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                    placeholder="Tags"
                    type="text"
                    class="form-control form-control-lg"
                    v-model="tagList"
                />
              </fieldset>
              <fieldset class="form-group">
                <button type="submit" :disabled="isSubmitting" class="btn btn-lg pull-xs-right btn-primary">
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from "@/components/ValidationErrors";
export default {
  name: "ArticleForm",
  components: {McvValidationErrors},
  props:{
    initialValues: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' ')
    }
  },
  methods: {
    onSubmit(){
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' ')
      }
      this.$emit('articleSubmit', form)
    }
  }
}
</script>

<style scoped>

</style>