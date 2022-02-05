<template>
<div>
  <button :class="{'btn': true, 'btn-sm': true, 'btn-primary': isFavoriteOptimistic, 'btn-outline-primary': !isFavoriteOptimistic}" @click="handleLike">
    <i class="ion-heart" />
    <span>&nbsp; {{ favoritesCountOptimistic }}</span>
  </button>
</div>
</template>

<script>
import {actionTypes} from "@/store/modules/article";

export default {
  name: "BtnFavorites",
  props: {
    isFavorite: {
      type: Boolean,
      required: true
    },
    articleSlug: {
      type: String,
      required: true
    },
    favoritesCount: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      isFavoriteOptimistic: this.isFavorite,
      favoritesCountOptimistic: this.favoritesCount,
    }
  },
  methods: {
    handleLike(){
      if(this.isFavoriteOptimistic){
        this.favoritesCountOptimistic--;
      } else {
        this.favoritesCountOptimistic++;
      }
      this.$store.dispatch(actionTypes.addToFavorites, {slug: this.articleSlug, isFavorite: this.isFavoriteOptimistic})
      this.isFavoriteOptimistic = !this.isFavoriteOptimistic
    }
  }
}
</script>

<style scoped>

</style>