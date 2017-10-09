<style scoped>
.main{
    height: calc(100vh - 5em);
    overflow: auto;
}
</style>
<template>
  <section>
      <HeaderNav :title="headerData.title" :titleAlign="headerData.titleAlign"
                 :hasRightBtn="headerData.hasRight"  :rightBtnText="headerData.rightBtnText"
                 @onRightBtnClick="add()"></HeaderNav>
      <section class="main">
      </section>
      <BottomNav :parent="viewName"></BottomNav>
  </section>
</template>
<script>
import BottomNav from '@/components/BottomNav.vue'
import HeaderNav from '@/components/HeaderNav.vue'
import utilities from '@/utilities/utilities'
export default {
  name:'List',
  components:{
      'BottomNav': BottomNav,
      'HeaderNav': HeaderNav
  },
  data(){
      return {
          headerData:{
              title: 'Lists',
              titleAlign: HeaderNav.CONFIG.CENTER,
              hasRight: true,
              rightBtnText: 'Add'
          }
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
