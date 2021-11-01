<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'Home'}" active-class="active">
        Devonics.Push
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'Home'}" active-class="active">
            Home
          </router-link>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Home'}" active-class="active">
              <i class="ion-compose"></i> &nbsp;
              Cabinet
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Home'}" active-class="active">
              <i class="ion-gear-a"></i> &nbsp;
              Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Home', params: {slug: currentUser.login}}" active-class="active">
              <img v-if="currentUser.image" :src="currentUser.image" class="user-pic" alt="User Picture">
              {{ currentUser.login }}
            </router-link>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Login'}" active-class="active">
              Sign In
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Register'}" active-class="active">
              Sign Up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script>
import {getterTypes} from "@/store/modules/auth";
import {mapGetters} from "vuex"

export default {
  name: 'McvTopBar',
  computed: {
    ...mapGetters({
        currentUser: getterTypes.currentUser,
        isLoggedIn: getterTypes.isLoggedIn,
        isAnonymous: getterTypes.isAnonymous
    }),
  }
}
</script>