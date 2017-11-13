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
    checkLogined: function(){
        if(this.isLogined()){
            this._logined();
            return true;
        }
        return false;
    },
    login: function(userid, password, callback){
        var instance = this;
        let res = store.dispatch(types.LOGIN_ACTION,
            {
                username: userid,
                password: password
            }).then( function(user){
                console.log(user);
                if(user){
                    console.log("login success");
                    localStorage.store(_LOGINED, user.username);
                    instance.checkLogined();
                    callback(ErrorCode.LOGIN_SUCCESS, user);
                    return;
                }
                callback(ErrorCode.USER_PASSWORD_NOT_FOUND);
                
            }).catch( function(error){
                console.log(error);
                callback(ErrorCode.USER_PASSWORD_NOT_FOUND);                
            });
    },
    
    _logined: function(){
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