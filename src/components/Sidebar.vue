<template>
    <div class="sidebar-wrapper">
      <div class="container">
        <i class="ion-navicon-round offside-toggle" id="hamburger" />

      <nav id="sidebar">
        <ul>
          <li>
            <div class="sidebar-group">
                <router-link :to="{name: 'Cabinet'}">
                  <i class="ion-gear-b sidebar-icon" />
                  <span class="sidebar-text">Cabinet</span>
                </router-link>
                <router-link class="sidebar-link" :to="{name: 'CabinetSettings'}">
                  <i class="ion-home sidebar-icon" />
                  <span class="sidebar-text">Settings</span>
                </router-link>
            </div>
          </li>
          <li>
            <div class="sidebar-group">
              <router-link :to="{name: 'AppIndex'}">
                <i class="ion-grid sidebar-icon" />
                <span class="sidebar-text">Applications</span>
              </router-link>
            </div>
          </li>
        </ul>
      </nav>
      </div>
    </div>
</template>

<script>
import 'offside-js/dist/offside.css';
import offside from 'offside-js';

export default {
  name: "Sidebar",
  mounted() {
    offside( '#sidebar', {
      slidingElementsSelector:'#content',
      buttonsSelector: '#hamburger',
    });
  }
}
</script>
<style scoped>
  #hamburger{
    cursor: pointer;
    font-size: 200%;
  }

  #sidebar ul{
    padding-left: 0;
  }
  .offside, .offside--left{
    left: -1000px;
  }

  .sidebar-link{
    text-decoration: none;
    display: block;
  }

  .sidebar-icon{
    font-size: 150%;
    margin-right: 5px;
  }

  .sidebar-text{
    vertical-align: text-bottom;
  }

  .offside--left.is-open, .offside-js--is-left .offside-sliding-element {
    transform: translate3d(1000px, 0, 0);
  }

  .offside{
    position: relative;
  }

  .sidebar-group{
    margin-bottom: 20px;
  }

</style>