<template>
<div>

</div>
</template>

<script>
import {actionTypes} from "@/store/modules/app";

export default {
  name: "AppView",
  mounted() {
    let internalId = this.$route.params.internalId
    this.$store.dispatch(actionTypes.getEntity, {
      internalId: internalId
    })
  }
}
</script>

<style scoped>

</style>