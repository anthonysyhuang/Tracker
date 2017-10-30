<style scoped>
ul{
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: auto;
}
li{
    float: left;
    position: relative;
    width: 33%;
    padding-bottom: 33%;
}
img{
    box-sizing: content-box;
    width: 80%;
    height: 80%;
    display: block;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.active{
    border: solid orange 4px;
    
}
</style>

<template>
    <ul class="ImageList">
        <li v-for="img in imgs" :key="img.id" @click="onImageSelected(img)">
            <img :src="getImgPath(img.path)" :class="{ 'active': selected.id == img.id}">
        </li>
    </ul>
</template>

<script>
import utilities from '@/utilities/utilities'

export default {
    name: 'ImageList',
    props: {
        imgs: Array,
        selected: Object,
    },
    data(){
        return {

        }
    },
    methods:{
        getImgPath: function(fileName){
            return utilities.getImgPath(fileName);
        },
        onImageSelected: function(img){
            console.log(img.id);
            this.$emit('onImageSelected', img);
        }
  }
}
</script>
