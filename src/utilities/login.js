import localStorage from './localStorage';

const _LOGINED = 'LOGINED';

export default {
    isLogined: function(){
        return localStorage.get(_LOGINED) == _LOGINED;
    },
    login: function(userid, password){
        if(userid == 'Anthony'
           && password == '12345'){
               localStorage.store(_LOGINED, _LOGINED);
               return true;
           }

        console.log(userid);
        console.log(password);
        return false;
    },
    logout: function(){
        localStorage.remove(_LOGINED);
    }
}