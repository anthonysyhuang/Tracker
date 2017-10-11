<style scoped>
    .main{
        height: calc(100vh - 5em);
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
        margin: 40px 0 10px 0;
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
        padding-top: 10px;
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
    }
    span{
        font-size: 1.3em;
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
        background-color: gray;
        color: white;
        font-size: 1em;
        padding: 10px 20px;
    }
</style>
<template>
  <section>
    <HeaderNav :title="headerData.title" :titleAlign="headerData.titleAlign"
               :hasRightBtn="headerData.hasRightBtn" :rightBtnText="headerData.rightBtnText"></HeaderNav>
    <section class="main">
        <div class="top-half">
            <img src="http://via.placeholder.com/150x150">
            <h1>{{ user.name }}</h1>
            <p>{{ user.quote }}</p>
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
                    <span>{{ user.saved }}</span>
                    </div>
                    <div class="half">
                        <label>Added</label>
                        <span>{{ user.added }}</span>
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
              rightBtnText: 'Edit'
          },
          user: mock.user
      }
  },
  methods:{
    logout: function(){
        login.logout();
        this.$router.push('/home');
    }  
  },
  computed:{
      ViewName: function(){ return utilities.VIEWNAME.PROFILE; },
      Gender: function(){ return this.user.gender == 1 ? 'Male' : 'Female'},
  }
}
</script>
