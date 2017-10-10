<style scoped>
.main{
    height: calc(100vh - 5em);
    overflow: auto;
}
ul{
    padding: 0;
    margin: 0;
}
.ProductCmp{
    width: 50%;
    float: left;
}
</style>
<template>
  <section>
      <HeaderNav :title="headerData.title" :titleAlign="headerData.titleAlign"
                 :hasRightBtn="headerData.hasRight"  :rightBtnText="headerData.rightBtnText"
                 @onRightBtnClick="add()"></HeaderNav>
      <section class="main">
          <ul>
              <ProductCmp v-for="product in products" :key="product.id" :product="product"></ProductCmp>
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
          products:[
              { id: 0, title: "A", locationNum: 45},
              { id: 1, title: "B", locationNum: 25},
              { id: 2, title: "C", locationNum: 45},
              { id: 3, title: "D", locationNum: 445},
              { id: 4, title: "E", locationNum: 495},
          ],
      }
  },
  computed:{
      viewName: function(){
          return utilities.VIEWNAME.LIST;
      }
  },
  methods:{
      add: function(){
          console.log("add");
      }
  }
}
</script>
