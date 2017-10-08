

<template>
    <BottomNav parentName={this}></BottomNav>
</template>


<script>
import BottomNav from '@/components/BottomNav'

export default {
  name: 'Home',
  components: {
      'BottomNav': BottomNav,
  }
}
</script>
