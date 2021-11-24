<template>
  <div class="home-page">
    <banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler />
          <mcv-feed :api-url="apiUrl">

          </mcv-feed>
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
import McvFeedToggler from "@/components/FeedToggler";
export default {
  name: "YourFeed",
  components: {
    McvFeedToggler,
    Banner,
    McvFeed,
    PopularTags
  },
  data(){
    return {
      apiUrl: '/articles/feed'
    }
  }
}
</script>

<style scoped>

</style>