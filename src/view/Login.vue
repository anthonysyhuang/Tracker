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
    position: relative;
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
.error-box{
    text-align: center;
    font-size: 0.8em;
    color: #d20000;
    transition: 0.3s ease;
    position: absolute;
    left: 50%;
    top: -10px;
    transform: translate(-50%,-5px);
    height: 0;
    overflow: hidden;
    width: 100%;
}
.error-box-show{
    height: 20px;
}
</style>

<template>
    <div class="main">
        <div class="logo">
            <img src="../assets/img/logo.png">
        </div>
        <form @submit.prevent="submit">
            <div class="error-box" :class="{'error-box-show': errorText != null}">
                {{ errorText }}
            </div>
            <div class="wrap">
                <label :class="{'label-focused': userNameIsFocused}" >Username</label>
                <input type="text" v-model="user.id"
                       @focus="toggleFocus(userNameClassObject)"
                       @blur="toggleFocus(userNameClassObject)">
            </div>
            <div class="wrap">
                <label :class="{'label-focused': PasswordIsFocused}">Password</label>
                <input type="password" v-model="user.password"
                       @focus="toggleFocus(passwordClassObject)"
                       @blur="toggleFocus(passwordClassObject)">
            </div>
            <input type="submit" value="Login">
        </form>
        <BottomNav></BottomNav>
    </div>
    
</template>



<script>
import BottomNav from '@/components/BottomNav'
import login from '@/utilities/login'
import ErrorCode from '@/utilities/ErrorCode'

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
            },
            errorText: null
        }
    },
    computed: {
        userNameIsFocused: function(){
            return this.userNameClassObject.isFocused || this.user.id;
        },
        PasswordIsFocused: function(){
            return this.passwordClassObject.isFocused || this.user.password;
        }
    },
    methods: {
        submit: function(event){
            let error = login.login(this.user.id, this.user.password);
            if(error === ErrorCode.LOGIN_SUCCESS){
                this.$router.push('/home');
            }
            else{
                this.errorText = error.text;
            }
        },
        toggleFocus: function(classObject){
            classObject.isFocused = !classObject.isFocused;
            this.errorText = null;
        },
        
    } 
}
</script>

