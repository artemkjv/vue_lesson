<template>
  <div class="profile-page" v-if="profile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-image" alt="Profile Image">
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <div>
              FOLLOW USER BTN
              <router-link v-if="isCurrentUserProfile" class="btn btn-sm btn-outline-secondary action-btn" :to="{name: 'Settings'}">
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link :to="{name: 'UserProfile', params: {slug: profile.username}}" class="nav-link" :class="{'active': routeName === 'UserProfile'}">
                  My Posts
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'UserProfileFavorites', params: {slug: profile.username}}" class="nav-link" :class="{'active': routeName === 'UserProfileFavorites'}">
                  Favorites Posts
                </router-link>
              </li>
            </ul>
          </div>
          <feed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Feed from "@/components/Feed";
import {actionTypes} from "@/store/modules/userProfile";

export default {
  name: "UserProfile",
  components: {Feed},
  computed: {
    ...mapState({
      isLoading: state => state.userProfile.isLoading,
      error: state => state.userProfile.error,
      profile: state => state.userProfile.data,
      currentUser: state => state.auth.currentUser
    }),
    isCurrentUserProfile(){
      if(!this.currentUser || !this.profile){
        return false
      }
      return this.currentUser.username === this.profile.username
    },
    apiUrl(){
      const isFavorites = this.$route.path.includes('favorites')
      return isFavorites ? `/articles?favorited=${this.profileSlug}` : `/articles/?author=${this.profileSlug}`
    },
    profileSlug(){
      return this.$route.params.slug
    },
    routeName(){
      return this.$route.name
    }
  },
  mounted() {
    this.getProfile()
  },
  watch: {
    profileSlug(){
      this.getProfile()
    }
  },
  methods: {
    getProfile(){
      this.$store.dispatch(
          actionTypes.getProfile,
          {
            slug: this.profileSlug
          }
      )
    }
  }
}
</script>

<style scoped>

</style>