import * as types from '@/store/mutation-types.js'

export default{
    state:{
        users:[],
        isSet: false,
    },
    getters:{
        getUserByUName: function(state){
            console.log('getUserByUName');
            return function(username){
                return state.users.find((user) => { return user.username == username});
            }
        }
    },
    mutations:{

        [types.DB_USERS_INIT](state, users){
            state.users = users;
            state.isSet = true;
        },
    },
    actions:{
        [types.LOGIN_ACTION]({ state, getters }, info){

            console.log(info);
            let user = getters.getUserByUName(info.username);
            if(!user) return false;

            if(user.password != info.password) return false;
            
            return user;
        }
    }
}