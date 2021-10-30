<template>
  <div>
    Feed
  </div>
</template>

<script>
import {actionTypes} from "@/store/modules/feed";

export default {
  name: "Feed",
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  mounted() {
    console.log('init feed')
    this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl})
  }
}
</script>

<style scoped>

</style>