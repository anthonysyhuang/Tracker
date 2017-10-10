<style scoped>
.ProductCmp{
    padding: 20px;
}
img{
    width: 100%;
    display: block;
}
h2{
    text-align: left;
    margin: 0;
}
</style>

<template>
  <div class="ProductCmp">
      <img src="http://via.placeholder.com/350x350">
      <div>
          <h2>{{ product.title}}</h2>
          <span>Location: {{ product.locationNum}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCmp',
  props: {
      product: Object
  },
  
}
</script>
