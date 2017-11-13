import * as types from '../mutation-types'

export default {
    state: {
        id: -1,
        username : '',
        name: '',
        age: -1,
        gender: 0,
        email: '',
        quote: '',
        profile_img: '',
        like: [],
        been: [],
        isInit: false
    },
    getters:{

    },
    mutations: {
        [types.USER_INIT](state, user){

            console.log("GOT DATA");
            console.log(user);
            
            state.id = user.id;
            state.username  = user.username;
            state.name = user.name;
            state.age = user.age;
            state.gender = user.gender;
            state.email = user.email;
            state.quote = user.quote;
            state.profile_img = user.profile_img;
            state.like = user.like;
            state.been = user.been;

            state.isInit = true;
        }
    },
    actions:{
        
    }
}