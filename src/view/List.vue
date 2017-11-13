<style scoped>
.main{
    height: calc(100vh - 6em);
    overflow: auto;
}
ul{
    padding: 0;
    margin: 0;
}
ul>a{
    margin: 20px;
    display: block;
    text-decoration: none;
}
.ProductCmp{
}
.filter-section{
    padding-top: 10px;
}
.filter-section>a{
    margin: 0 10px;
}
.filter-active{
    text-decoration: underline;
    color: #8E4234;
}
</style>
<template>
  <section>
      <HeaderNav :title="headerData.title" :titleAlign="headerData.titleAlign"
                 :hasRightBtn="headerData.hasRight"  :rightBtnText="headerData.rightBtnText"
                 @onRightBtnClick="add()"></HeaderNav>
      <section class="main">
          <div class="filter-section">
              <a :class="{ 'filter-active': isAcitve(allMode)}" @click="filterActive(allMode)">{{ allMode }}</a>|
              <a :class="{ 'filter-active': isAcitve(savedMode)}" @click="filterActive(savedMode)">{{ savedMode }}</a>|
              <a :class="{ 'filter-active': isAcitve(addedMode)}" @click="filterActive(addedMode)">{{ addedMode }}</a>
          </div>
          <ul>
              <router-link :to="{ name: 'item', params: { id: String(product.id) } }" v-for="product in ProductsList" :key="product.id">
                  <ProductCmp  :product="product" :isSave="isSaved(product)" @onToggle="toggle(product)"></ProductCmp>
              </router-link>
              
          </ul>
      </section>
      <BottomNav :parent="viewName"></BottomNav>
  </section>
</template>
<script>
import BottomNav from '@/components/BottomNav.vue'
import HeaderNav from '@/components/HeaderNav.vue'
import utilities from '@/utilities/utilities'
import ProductCmp from '@/components/ProductCmp.vue'
import mock from '@/mock/mock.js'

export default {
  name:'List',
  components:{
      'BottomNav': BottomNav,
      'HeaderNav': HeaderNav,
      'ProductCmp': ProductCmp
  },
  data(){
      return {
          headerData:{
              title: 'Lists',
              titleAlign: HeaderNav.CONFIG.CENTER,
              hasRight: true,
              rightBtnText: 'Add'
          },
          products: mock.products,
          allMode: 'All',
          savedMode: 'Saved',
          addedMode: 'Added',
          filterMode: 'All',
      }
  },
  computed:{
      User: function(){
          return this.$store.state.user;
      },
      viewName: function(){
          return utilities.VIEWNAME.LIST;
      },
      ProductsList: function(){
        if(this.filterMode == this.allMode)
            return this.products;
        else if(this.filterMode == this.savedMode){
            return this.products.filter( word => {
                let set = new Set(this.User.like);
                return set.has(word.id);
            })
        }
        else if(this.filterMode == this.addedMode){
            return this.products.filter( word => {
                let set = new Set(this.User.been);
                return set.has(word.id);
            })
        }
      }
  },
  methods:{
      filterActive: function(mode){
          this.filterMode = mode;
      },
      isAcitve: function(mode){
          return this.filterMode == mode;
      },
      add: function(){
          console.log("add");
      },
      isSaved: function(product){
          return this.User.like.find( id => { return id == product.id; }) != undefined ? true : false;
      },
      toggle: function(product){
          [].splice
          let index = this.User.like.indexOf(product.id);
          if(index == -1) this.User.like.push(product.id);
          else this.User.like.splice(index, 1);
      }
  }
}
</script>
