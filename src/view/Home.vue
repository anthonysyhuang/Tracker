
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
#map{
    display: block;
    height: 100%;
}
</style>

<template>
    <div>
        <HeaderNav :title="headerData.title" :hasLeftBtn="headerData.hasLeft"
                   :titleAlign="headerData.titleAlign" :hasRightBtn="headerData.hasRight"
                   @onLeftBtnClick="goBack()"></HeaderNav>
        <section class="Home">
            <div id="map" ref="map">
            </div>
            <!-- <img src="../assets/img/map.png"> -->
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
          },
          map: null,
          spots: this.$store.state.db_spots.spots
      }
  },
  mounted: function(){
      console.log(google);
      this.map = new google.maps.Map(this.$refs.map, {
        center: {
                    lat: 37.786235,
                    lng: -122.399405
                },
        zoom: 12
      });
      
      for(let i = 0; i < this.spots.length; i++){
          console.log({lat: this.spots[i].lat, lng: this.spots[i].lng});
          new google.maps.Marker({
              position: {lat: this.spots[i].lat, lng: this.spots[i].lng},
              map: this.map
          });
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
