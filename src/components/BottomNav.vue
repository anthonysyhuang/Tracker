<style scoped>
.BottomNav{
    width: 100%;
    background-color: gray;
}
ul{
    display: flex;
    list-style: none;
    text-align: center;
    padding: 0;
    margin: 0;
    height: 2.5em;
}
a{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
}
li{
    color: white;
}
.active{
    color: red;
}
</style>


<template>
    <section class="BottomNav">
        <ul>
            <router-link :to="{ name: 'home'}"><li :class="{'active': isHome}">Home</li></router-link>
            <router-link :to="{ name: 'list'}"><li :class="{'active': isList}">List</li></router-link>
            <router-link :to="{ name: 'profile'}"><li :class="{'active': isProfile}">Profile</li></router-link>
        </ul>
    </section>
</template>

<script>
import utilities from '@/utilities/utilities'

export default {
    name: 'BottomNav',
    props:['parent'],
    computed:{
        isHome: function(){ return this.parent === utilities.VIEWNAME.HOME},
        isList: function(){ return this.parent === utilities.VIEWNAME.LIST},
        isProfile: function(){ return this.parent === utilities.VIEWNAME.PROFILE}
    }
}
</script>
