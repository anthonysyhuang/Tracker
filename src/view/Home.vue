
<style scoped>
.HeaderNav{
    height: 3em;
    width: 100%;
}
.BottomNav{
    height: 3em;
    bottom: 0;
}
.Home{
    height: calc(100vh - 6em);
    overflow: auto;
}
img{
    display: block;
}
</style>

<template>
    <div>
        <HeaderNav :title="headerData.title" :hasLeftBtn="headerData.hasLeft"
                   :titleAlign="headerData.titleAlign" :hasRightBtn="headerData.hasRight"
                   @onLeftBtnClick="goBack()"></HeaderNav>
        <section class="Home">
            <img src="../assets/img/map.png">
        </section>
        <BottomNav :parent="viewName"></BottomNav>
    </div>
</template>


<script>
import BottomNav from '@/components/BottomNav.vue'
import utilities from '@/utilities/utilities.js'
import HeaderNav from '@/components/HeaderNav.vue'

export default {
  name: 'Home',
  components: {
      'BottomNav': BottomNav,
      'HeaderNav': HeaderNav
  },
  data(){
      return {
          headerData:{
              title: "Tracker",
              hasRight: false,
              hasLeft: false,
              titleAlign: HeaderNav.CONFIG.CENTER
          }
      }
  },
  computed:{
      viewName: function(){ return utilities.VIEWNAME.HOME; }
  },
  methods:{
      goBack: function(){
          console.log("back");
      }
  }
}
</script>
