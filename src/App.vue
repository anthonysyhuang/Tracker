<style scoped>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .2s;
}

.fade-enter-active {
  transition-delay: .2s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>

<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    
  </div>
</template>

<script>
import axios from 'axios'
import * as types from '@/store/mutation-types'

export default {
  name: 'app',

  beforeCreate: function(){
    let store = this.$store;
    axios.get('static/data/data_feed.json').then(function(data){
            console.log(data);
            console.log(data.data.users[0].id);
            
            store.commit(types.DB_USERS_INIT, data.data.users);
            store.commit(types.DB_SPOTS_INIT, data.data.spots);

    }).catch(function(error){

    });
  },
}
</script>
<style src="./assets/css/theme.css" lang="css"></style>
<style src="./assets/css/iconfont.css" lang="css"></style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}
</style>
