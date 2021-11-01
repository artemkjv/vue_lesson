<template>
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">

        <h1 class="text-xs-center">Your Settings</h1>

        <form class="ng-pristine ng-valid ng-valid-email">
          <fieldset>

            <fieldset class="form-group">
              <input class="form-control ng-pristine ng-untouched ng-valid ng-not-empty" type="text" placeholder="URL of profile picture">
            </fieldset>

            <fieldset class="form-group">
              <input class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-not-empty" type="text" placeholder="Username">
            </fieldset>

            <fieldset class="form-group">
              <input class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty" type="password" placeholder="New Password">
            </fieldset>

            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              Update Settings
            </button>

          </fieldset>
        </form>

        <!-- Line break for logout button -->
        <hr>

        <button class="btn btn-outline-danger">
          Or click here to logout.
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CabinetSettings",
  computed: {
    ...mapGetters({
    })
  }
}
</script>

<style scoped>

</style>