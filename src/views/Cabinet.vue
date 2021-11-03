<template>
<div>

</div>
</template>

<script>
import {getterTypes} from "@/store/modules/auth";
import {mapGetters} from "vuex"

export default {
  name: "Cabinet",
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous
    })
  },
}
</script>

<style scoped>

</style>