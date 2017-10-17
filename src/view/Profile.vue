<style scoped>
    .main{
        height: calc(100vh - 6em);
        overflow: auto;
    }
    .top-half{
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-bottom: 20px;
    }
    .top-half>img{
        object-fit: contain;
        margin: 40px auto 10px auto;
        height: 150px;
        width: 150px;
        border-radius: 75px;
    }
    .top-half>h1{
        font-size: 2em;
    }
    .top-half>p{
        width: 80%;
        margin: auto
    }
    .row{
        overflow: auto;
    }
    .border-top-solid{
        border-top: solid 2px #f7f7f7;        
    }
    .border-right-solid{
        border-right: solid 2px #f7f7f7;
    }
    .half{
        width: 50%;
        float: left;
        padding: 5px;
    }
    .full{
        padding: 5px;
    }
    label,
    span{
        display: block;
    }
    label{
        text-align: left;
        color: black;
        font-size: 0.8em;
    }
    span{
        font-size: 1em;
    }
    .bottom-half{
        background-color: #f3f3f3;
        padding: 30px 0;
    }
    .card{
        background-color: white;
        margin: auto;
        box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.2);
    }
    .logout{
        padding-top: 20px;
    }
    .logout>button{
        border: none;
        background-color: #091221;
        color: white;
        font-size: 1em;
        padding: 10px 20px;
        width: 80%;
    }
    #change-name{
        font-size: 2em;
        text-align: center;
        border: none;
        border-bottom: solid 1px gray;
        margin: 1em 0;
    }
    .input-box{
        position: relative;
        padding-top: 10px;
    }
    .input-box>label{
        position: absolute;
        top: 0;
        left: 20px;
        color: gray;
    }
    #change-bio{
        width: 80%;
        margin: 10px auto;
        resize: none;
    }
</style>
<template>
  <section>
    <HeaderNav :title="headerData.title" :titleAlign="headerData.titleAlign"
               :hasRightBtn="headerData.hasRightBtn" :rightBtnText="headerData.rightBtnText"
               :hasLeftBtn="headerData.hasLeftBtn" :leftBtnText="headerData.leftBtnText"
               @onRightBtnClick="onRgBtnClick()" @onLeftBtnClick="onLfBtnClick()"></HeaderNav>
    <section class="main">
        <div class="top-half">
            <img src="../assets/img/p.jpg">
            <h1 v-if="!editMood">{{ user.name }}</h1>
            <div class="input-box" v-if="editMood">
                <label>Name</label>
                <input type="text" v-model="userUnSave.name" id="change-name">
            </div>
            
            <p v-if="!editMood">{{ user.quote }}</p>
            <div class="input-box" v-if="editMood">
                <label>Bio</label>
                <textarea v-model="userUnSave.quote" id="change-bio" rows="3">
                </textarea>
            </div>
        </div>
        <div class="bottom-half">
            <div class="card">
                <div class="row">
                    <div class="half border-right-solid">
                        <label>Gender</label>
                        <span>{{ Gender }}</span>
                    </div>
                    <div class="half">
                        <label>Age</label>
                        <span>{{ user.age }}</span>
                    </div>
                </div>
                <div class="row border-top-solid">
                    <div class="full">
                        <label>E-mail</label>
                        <span>{{ user.email }}</span>
                    </div>
                </div>
                <div class="row border-top-solid">
                    <div class="half border-right-solid">
                    <label>Saved</label>
                    <span>{{ user.saved.length }}</span>
                    </div>
                    <div class="half">
                        <label>Added</label>
                        <span>{{ user.added.length }}</span>
                    </div>
                </div>
            </div>
            <section class="logout">
                <button @click="logout()">Logout</button>
            </section>
        </div>
    </section>
    <BottomNav :parent="ViewName"></BottomNav>
  </section>
</template>
<script>
import BottomNav from '@/components/BottomNav.vue'
import HeaderNav from '@/components/HeaderNav.vue'
import utilities from '@/utilities/utilities.js'
import login from '@/utilities/login.js'
import mock from '@/mock/mock.js'

export default {
  name: 'Profile',
  components: {
      'BottomNav': BottomNav,
      'HeaderNav': HeaderNav
  },
  data(){
      return {
          headerData: {
              title: 'Profile',
              titleAlign: HeaderNav.CONFIG.CENTER,
              hasRightBtn: true,
              rightBtnText: 'Edit',
              hasLeftBtn: false,
              leftBtnText: 'Cancel'
          },
          user: mock.user,
          userUnSave: Object.assign({}, mock.user),
          editMood: false
      }
  },
  methods:{
    logout: function(){
        login.logout();
        this.$router.push({ name: 'login'});
    },
    onRgBtnClick: function(){
        if(this.editMood){
            //Done
            this.editMood = false;
            this.headerData.rightBtnText = 'Edit';
            this.headerData.hasLeftBtn = false;

            this.user = Object.assign({}, this.userUnSave);
        }
        else{
            //Edit
            this.editMood = true;
            this.headerData.rightBtnText = 'Done';
            this.headerData.hasLeftBtn = true;
        }
    },
    onLfBtnClick: function(){
        //Cancel
        this.editMood = false;
        this.headerData.rightBtnText = 'Edit';
        this.headerData.hasLeftBtn = false;

        this.userUnSave = Object.assign({}, this.user);
    }
  },
  computed:{
      ViewName: function(){ return utilities.VIEWNAME.PROFILE; },
      Gender: function(){ return this.user.gender == 1 ? 'Male' : 'Female'},
  }
}
</script>
