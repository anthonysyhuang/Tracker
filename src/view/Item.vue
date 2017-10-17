<style scoped>
.main{
    height: calc(100vh - 3em);
    overflow: auto;
}
.img-section{
    height: 40%;
    width: 100%;
    position: relative;
}
.title-section{
    position: absolute;
    bottom: 0;
    background-color: rgba(0,0,0,0.3);
    width: 100%;
    padding: 10px 0;
}
h1{
    margin: 0;
    font-size: 1em;
    padding: 0 10px;
    text-align: left;
    color: white;
}
.imgs{
    width: 100%;
    height: 100%;
    transition: 0.5s ease;
    display: flex;
    position: relative;
}
.imgs>img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
    padding-top: 20px;
    height: 50vh;
    overflow: auto;
}
li{
    padding: 10px 10px 10px 20px;
    text-align: left;
}
li>span{
    display: inline-block;
    border:solid 1px gray;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.7em;
}
li>span.active{
    color: white;
    border:solid 1px #8E4234;
    background-color: #8E4234;
}
li>.vote-result{
    height: 10px;
    width: 88%;
    display: block;
    margin: 8px 30px 5px 0px;
}
.bar{
    height: 100%;
    background-color: #B1A1A2;
    position: relative;
    border-radius: 10px;
    transition: 0.3s ease;
}
.bar>.vote-num{
    position: absolute;
    right: -1.3em;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 0.7em;
}
.map-section{
    height: 50vh;
    overflow: auto;
}
.imgs-btn{
    position: absolute;
    height: 30%;
    background-color: rgba(0,0,0,0.3);
    border: none;
    color: white;
    top: 50%;
    transform: translate(0,-50%);
    padding: 0;
    outline: none;
}
.lfBtn{
    left: 0;
}
.rgBtn{
    right: 0;
}
.count{
    width: 3em;
    height: 3em;
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1em;
    background-color: rgba(0,0,0,0.3);
}
.add-hashtag{
    padding: 10px 10px 10px 40px;
    position: relative;
}
.add-hashtag>input{
    border: none;
    width: 90%;
    line-height: 1.3em;
    outline: none;
    font-size: 1.1em;
    transition: 1s ease;
    background-color: transparent;
}
.add-hashtag>label{
    position: absolute;
    padding-top: 3px;
    margin-left: 3px;
    z-index: -2;
    height: 1.5em;
    width: 50%;
    overflow: hidden;
    color: gray;
    font-size: 1em;
}
.vote-section{
    text-align: left;
}
.add-icon{
    position: absolute;
    transition: 1s ease;
    left: 20px;
}
.add-active{
    transform: rotate(360deg);
    left: 90%;
}
.bot-line{
    height: 1px;
    width: 0;
    background-color: gray;
    transition: 1s ease;
}
.bot-line-active{
    width: 90%;
}
.cover{
    position: absolute;
    padding-top: 3px;
    z-index: -1;
    height: 1.5em;
    width: 0;
    transition: 1s ease;
    background-color: white;
}
.cover-active{
    width: 70%;
}
</style>

<template>
    <section>
        <HeaderNav :hasLeftBtn="headerData.hasLeftBtn" :leftBtnText="headerData.leftBtnText"
                   :title="headerTitle" @onLeftBtnClick="back()"></HeaderNav>
        <section class="main">
            <div class="img-section">
                <div class="imgs" :style="{ transform: 'translate('+ slidePercentage +'%,0)'}">
                    <img v-for="img in ItemInfo.imgs" :src="getImgPath(img)" :key="img">
                </div>
                <button class="lfBtn imgs-btn" @click="left()"><i class="material-icons">chevron_left</i></button>
                <button class="rgBtn imgs-btn" @click="right()"><i class="material-icons">chevron_right</i></button>
                <div class="count">{{ CurrentImgIndex + 1 }}/{{ ItemInfo.imgs.length }}</div>
                <div class="title-section">
                    <h1>{{ItemInfo.title}}</h1>
                </div>       
            </div>
            <ul class="vote-section">
                <div class="add-hashtag">
                    <i class="material-icons add-icon" :class="{'add-active': HashTagZone.active || HashTagZone.value}" @click="addHashTag()">add</i>
                    <div class="cover" :class="{'cover-active': HashTagZone.active || HashTagZone.value}"></div>
                    <label>{{ HashTagZone.placeholder }}</label>
                    <input type="text" @focus="onAddFocus()" @blur="onAddBlur()" v-model="HashTagZone.value">
                    <div class="bot-line" :class="{'bot-line-active': HashTagZone.active || HashTagZone.value}"></div>
                </div>
                <li v-for="tag in ItemInfo.tags" :key="tag.id">
                    <span :class="{ 'active': tag.active }" @click="vote(tag)">{{ tag.tagText }}</span>
                    <div class="vote-result">
                        <div class="bar" :style="{ width: getWidth(tag.tagNum) + '%'}">
                            <span class="vote-num"> {{ tag.tagNum }}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="map-section">
                <img src="../assets/img/map.png">
            </div>
        </section>
    </section>
  
</template>


<script>
import HeaderNav from '@/components/HeaderNav.vue'
import mock from '@/mock/mock.js'

export default {
  name: 'Item',
  components:{
      'HeaderNav' : HeaderNav,
  },
  data(){
        return {
            headerData:{
                hasLeftBtn: true,
                leftBtnText: 'Back',
            },
            ItemInfo: this.updateData(),
            CurrentImgIndex: 0,
            HashTagZone:{
                value: '',
                active: false,
                placeholder: 'Add hashtag here...'
            }
            
        }
  },
  methods:{
      getWidth: function(num){
          if(this.ItemInfo.tags.length == 0 || num == 0) return 0;

          return num/this.ItemInfo.tags[0].tagNum*100;
      },
      vote: function(tag){
          if(tag.active){
              tag.active = false;
              tag.tagNum--;
          }
          else{
              tag.active = true;
              tag.tagNum++;
          }
      },
      updateData: function(){
          let obj =  mock.products.find( product =>{ return product.id == this.$route.params.id } );

          if(obj.tags){
            obj.tags.sort(function(a, b){
                if(a.tagNum < b.tagNum) return 1;
                else if(a.tagNum > b.tagNum) return -1;

                return 0;
            });
          }

          return obj;
      },
      back: function(){
          console.log('back');
          this.$router.push({ name: 'list'});
      },
      getImgPath: function(fileName){
          return require('../assets/img/' + fileName);
      },
      left: function(){
          
          if(this.CurrentImgIndex == 0) return;

          this.CurrentImgIndex--;
      },
      right: function(){
          if(this.CurrentImgIndex == this.ItemInfo.imgs.length - 1) return;

          this.CurrentImgIndex++;
      },
      onAddFocus: function(){
          this.HashTagZone.active = true;
      },
      onAddBlur: function(){
          this.HashTagZone.active = false;
      },
      addHashTag: function(){
          console.log('addhashtag');
          if(!this.HashTagZone.value) return;
          
          let zone = this.HashTagZone;
          let item = this.ItemInfo;
          let tagText = '#' + zone.value;
          let result = item.tags.find( tag => { return tag.tagText == tagText});

          //hashtag exist
          if(result){
              if(!result.active) //not vote yet
                this.vote(result);
          }
          else{
              item.tags.push({
              id: item.tags.length,
              tagText: tagText,
              tagNum: 1,
              active: true});
          }
          zone.value = '';
      }
  },
  computed:{
      slidePercentage: function(){
          return -this.CurrentImgIndex * 100;
      },
      headerTitle: function(){
          return this.ItemInfo.title;
      },
  },
  watch:{
      $route: function(to, from){
          this.ItemInfo = this.updateData();
      }
  }
}
</script>
