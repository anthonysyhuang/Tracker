import localStorage from '@/utilities/localStorage';
import ErrorCode from './ErrorCode';
import store from '@/store'
import * as types from '@/store/mutation-types'
const _LOGINED = 'LOGINED';

export default {
    isLogined: function(){

        let username = localStorage.get(_LOGINED);

        if(username == null) return false;

        console.log("isLogined: username=" + username);

        return true;
    },
    login: function(userid, password, callback){
        let res = store.dispatch(types.LOGIN_ACTION,
            {
                username: userid,
                password: password
            }).then( function(user){
                console.log(user);
                if(user){
                    localStorage.store(_LOGINED, user.username);
                    callback(ErrorCode.LOGIN_SUCCESS, user);
                }
                callback(ErrorCode.USER_PASSWORD_NOT_FOUND);
                
            }).catch( function(error){
                callback(ErrorCode.USER_PASSWORD_NOT_FOUND);                
            });
    },
    logined: function(){
        console.log("logined");
        let username = localStorage.get(_LOGINED);
        console.log(username);        
        let user = store.getters.getUserByUName(username);
        console.log(user);
        store.commit(types.USER_INIT, user);
    },
    logout: function(){
        localStorage.remove(_LOGINED);
    }
}