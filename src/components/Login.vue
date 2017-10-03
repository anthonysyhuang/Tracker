<style>
.main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.logo{
    flex: 5;
    display: flex;
    justify-content: center;
    align-content: center;
    justify-content: center;
    align-items: center;
}
img{
    margin: 30px;
    width: 60%;
    max-width: 300px;
}
form{
    flex: 5;
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 60%;
    text-align: left;
}
.wrap{
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    position: relative;
}
.wrap>label{
    position: absolute;
    top: 5px;
    left: 0;
    color: gray;
    transition: 0.5s ease;
}
.wrap>input{
    z-index: 1;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: solid 1px gray;
    font-size: 1em;
    line-height: 1.5em;
}
input[type=submit]{
    margin: 10px 0;
    border: none;
    background-color: antiquewhite;
    height: 35px;
}
.input-focused{
    font-size: 1.5em;
}
.wrap>.label-focused{
    font-size: 0.6em;
    top: -10px;
}
</style>

<template>
    <div class="main">
        <div class="logo">
            <img src="../assets/img/logo.png">
        </div>
        <form @submit.prevent="submit">
            <div class="wrap">
                <label :class="{'label-focused': userNameClassObject.isFocused || user.id}" >Username</label>
                <input type="text" v-model="user.id"
                       @focus="toggleFocus(userNameClassObject)"
                       @blur="toggleFocus(userNameClassObject)">
            </div>
            <div class="wrap">
                <label :class="{'label-focused': passwordClassObject.isFocused || user.password}">Password</label>
                <input type="password" v-model="user.password"
                       @focus="toggleFocus(passwordClassObject)"
                       @blur="toggleFocus(passwordClassObject)">
            </div>
            <input type="submit" value="Login">
        </form>
    </div>
</template>



<script>
import login from '@/utilities/login'

export default {
    name: 'Login',
    data() {
        return {
            user: {
                id:'',
                password:''
            },
            userNameClassObject: {
                isFocused: false
            },
            passwordClassObject: {
                isFocused: false
            }
        }
    },
    methods: {
        submit: function(event){
            if(login.login(this.user.id, this.user.password)){
                this.$router.push('/logout');
            }
        },
        toggleFocus: function(classObject){
            classObject.isFocused = !classObject.isFocused;
        },
        
    } 
}
</script>

