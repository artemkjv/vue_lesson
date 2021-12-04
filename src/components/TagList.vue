<template>
  <ul class="tag-list">
    <li v-for="tag in tags" :key="tag" class="tag-default tag-pill tag-outline">
      {{ tag }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "TagList",
  props: {
    tags: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>

</style>