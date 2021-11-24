<template>
  <div class="home-page">
    <banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler :tag-name="tagName" />
          <mcv-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <PopularTags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed'
import Banner from "@/components/Banner";
import PopularTags from "@/components/PopularTags";
import McvFeedToggler from '@/components/FeedToggler';

export default {
  name: "TagFeed",
  components: {
    Banner,
    McvFeed,
    PopularTags,
    McvFeedToggler
  },
  computed: {
    tagName() {
      return this.$route.params.slug
    },
    apiUrl() {
      return `/articles?tag=${this.tagName}`
    }
  }
}
</script>

<style scoped>

</style>