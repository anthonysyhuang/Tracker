
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
.marker{
    transform: translate(-50%,-100%);
    position: relative;
}

</style>
<style>
.marker{
    transform: translate(-50%, -75px);
    height: 70px;
    width: 70px;
    border: 2px solid #B1A1A2;
}
.marker::after{
    position: absolute;
    content: '';
    border: 10px solid transparent;
    border-top: 10px solid #B1A1A2;
    bottom: -20px;
    left: 50%;
    transform: translate(-50%, 0);
}
.marker-content{
    position: relative;
    width:100%;
    height: 100%;
}
.marker-content span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 1.5em;
    color: white;
    font-weight: bold;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(0,0,0,0.2);
    align-items: center;
}
.marker-content img{
    width: 100%;
    height: 100%;
    object-fit: cover;
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
      'HeaderNav': HeaderNav,
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
        zoom: 12,
        clickableIcons: false,
      });
      
      this.map.addListener('click', function(e){
          console.log('Map onClick');
          console.log(e.latLng.lat());
      })

      for(let i = 0; i < this.spots.length; i++){
          console.log({lat: this.spots[i].lat, lng: this.spots[i].lng});
          console.log(this.spots[i].id);
          let spot = this.spots[i];
          let vue = this;
          let marker = new Marker(spot, function(){
              console.log(spot.id);
              vue.$router.push({ name: 'item', params: { id: String(spot.id) } });
          });
          marker.setMap(this.map);      
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

function Marker(spot, onClick){
    this.spot = spot;
    this.lat = spot.lat;
    this.lng = spot.lng;
    console.log(onClick);
    this.onClick = onClick;
    this.pos = new google.maps.LatLng(this.lat,this.lng);
}

Marker.prototype = new google.maps.OverlayView();
Marker.prototype.onRemove= function(){}
    
//init your html element here
Marker.prototype.onAdd= function(){
    this.div = document.createElement('DIV');
    this.div.className = "marker";
    this.div.innerHTML = '<div class="marker-content"><span>'+ this.spot.imgs.length +'+</span><img src="'+ utilities.getSpotImgPath(this.spot, this.spot.imgs[0].path) +'"></div>';
    this.div.style.position = 'absolute';

    let callback = this.onClick;
    this.div.addEventListener('click', function(){
        console.log('onclick');
        if(callback){
            callback();
        }
    })
    var panes = this.getPanes();
    panes.overlayImage.appendChild(this.div);
}

Marker.prototype.draw = function(){
    var overlayProjection = this.getProjection();
    var position = overlayProjection.fromLatLngToDivPixel(this.pos);
    var panes = this.getPanes();
    this.div.style.left = position.x + 'px';
    this.div.style.top = position.y + 'px';
}

</script>
