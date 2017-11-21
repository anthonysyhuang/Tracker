
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
.add-pin{
    position: absolute;
    height: calc(100vh - 3em);
    background-color: #efefef;
    width: 100%;
    top: 3em;
    left: 0;
    display: flex;
    flex-direction: column;
}
.add-pin>input{
    border: none;
    display: block;
    padding: 0;
    height: 70px;
    line-height: 3em;
    font-size: 2em;
    outline: none;
    padding-left: 10px;
    margin: 20px;
    box-shadow: 0 0 5px 0px #80808045;
}
.img-upload{
    background-color: white;
    margin: 20px;
    box-shadow: 0 0 5px 0px #80808045;
    overflow: hidden;
}
.img-upload>div{
    float: left;
    width: 33.3333%;
    padding-top: 33.3333%;
    display: block;
    position: relative;
}
.img-upload img{
    position: absolute;
    width: 80%;
    height: 80%;
    object-fit: cover;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.add-img{
    position: absolute;
    width: 80%;
    height: 80%;
    object-fit: cover;
    border: solid 1px #eaeaea;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #c8c8c8;
}
.add-img-input{
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
}
</style>

<template>
    <div>
        <HeaderNav :title="headerData.title" :hasLeftBtn="headerData.hasLeft"
                   :titleAlign="headerData.titleAlign" :hasRightBtn="headerData.hasRight"
                   :rightBtnText="headerData.rightBtnText" :leftBtnText="headerData.leftBtnText"
                   @onLeftBtnClick="onLeftBtnClick()" @onRightBtnClick="onRightBtnClick()"></HeaderNav>
        <section class="Home">
            <div id="map" ref="map">
            </div>
            <!-- <img src="../assets/img/map.png"> -->
        </section>
        <BottomNav :parent="viewName"></BottomNav>
        <section v-if="editObject.on" class="add-pin">
            <input type="text" placeholder="Title" v-model="editObject.title">
            <div class="img-upload">
                <div v-for="img in editObject.imgs" :key="img">
                    <img :src="img">
                </div>
                <div>
                    <div class="add-img">
                        <input type="file" accept=".png, .jpg, .jpeg" class="add-img-input"
                        multiple="multiple" @change="onAddImage($event)">
                        <i class="material-icons">add</i>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'
import utilities from '@/utilities/utilities.js'
import HeaderNav from '@/components/HeaderNav.vue'
import * as types from '@/store/mutation-types.js'

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
          spots: this.$store.state.db_spots.spots,
          markers: [],
          editObject:{
              on: false,
              title: '',
              lat: 0,
              lng: 0,
              imgs: []
          }
      }
  },
  mounted: function(){
      console.log(google);
      let vue = this;

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
          vue.addPin(e.latLng.lat(), e.latLng.lng());
      });

        for(let i = this.markers.length; i < this.spots.length; i++){
            this.addMarker(this.spots[i]);
        }
  },
  computed:{
      viewName: function(){ return utilities.VIEWNAME.HOME; }
  },
  watch:{
      spots: {
          handler: function(val, oldVal){
            console.log('watch spots: ' + this.spots.length);
            console.log(val);
            console.log(oldVal);
            for(let i = this.markers.length; i < this.spots.length; i++){
                this.addMarker(this.spots[i]);
            }
          }
      },
      editObject: {
        deep: true,
        handler: function(){
            if(this.editObject.on){
                this.headerData = {
                title: "Add Spot",
                hasRight: true,
                hasLeft: true,
                rightBtnText: 'Add',
                leftBtnText: 'Cancel',
                titleAlign: HeaderNav.CONFIG.CENTER
                }
            }
            else{
                this.headerData = {
                    title: "Tracker",
                    hasRight: false,
                    hasLeft: false,
                    titleAlign: HeaderNav.CONFIG.CENTER
                }
            }
        }
      }
  },
  methods:{
      onRightBtnClick: function(){
          console.log("onRightBtnClick");
          //add to spots
          this.$store.commit(types.ADD_SPOT_ACTION, this.editObject);
          this.editObject.on = false;
      },
      onLeftBtnClick: function(){
          console.log("onLeftBtnClick");
          this.editObject.on = false;
      },
      addPin: function(lat, lng){
          this.editObject.title = '';
          this.editObject.imgs = [];
          this.editObject.on = true;
          this.editObject.lat = lat;
          this.editObject.lng = lng;
      },
      addImage: function(e){
          console.log("addImage");
          this.editObject.imgs.push(e.target.result);
      },
      onAddImage: function(e){
          console.log(e.target);
          let vue = this;
          for(let i = 0; i < e.target.files.length; i++){
              let reader = new FileReader();
              reader.onload = this.addImage;
              reader.readAsDataURL(e.target.files[i]);
          }
      },
      addMarker: function(spot){
        //console.log({lat: this.spots[i].lat, lng: this.spots[i].lng});
        console.log("addMarker" + spot.id);
        //let spot = this.spots[i];
        let vue = this;
        let marker = new Marker(spot, function(){
            vue.$router.push({ name: 'item', params: { id: String(spot.id) } });
        });
        marker.setMap(this.map);
        this.markers.push(marker);
      }
  }
}

function Marker(spot, onClick){
    this.spot = spot;
    this.lat = spot.lat;
    this.lng = spot.lng;
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
