<style scoped>
.container{
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: gray;
}
ul{
    display: flex;
    list-style: none;
    text-align: center;
    padding: 0;

    
}
li{
    flex: 1;
    color: white;
}
.active{
    color: red;
}
</style>


<template>
    <div class="container">
        <ul>
            <li :class="{'active': parentName == 'Home'}">Home</li>
            <li>List</li>
            <li>Profile</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'BottomNav',
    props:['parentName'],
}
</script>
