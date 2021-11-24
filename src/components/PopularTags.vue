<template>
  <div>
    <loading v-if="isLoading" />
    <error-message v-if="error"  />
    <div class="sidebar" v-if="popularTags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
            v-for="popularTag in popularTags"
            :key="popularTag"
            :to="{name: 'Tag', params: {slug: popularTag}}"
            class="tag-default tag-pill"
        >
          {{popularTag}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {actionTypes} from "@/store/modules/popularTags";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  name: "PopularTags",
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      error: state => state.popularTags.error,
      popularTags: state => state.popularTags.data
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getTags)
  },
  components: {
    ErrorMessage,
    Loading
  }
}
</script>

<style scoped>

</style>