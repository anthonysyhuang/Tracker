import localStorage from './localStorage';
import ErrorCode from './ErrorCode';

const _LOGINED = 'LOGINED';

export default {
    isLogined: function(){
        return localStorage.get(_LOGINED) == _LOGINED;
    },
    login: function(userid, password){
        if(userid == 'Anthony'
           && password == '12345'){
               localStorage.store(_LOGINED, _LOGINED);
               return ErrorCode.LOGIN_SUCCESS;
           }

        console.log(userid);
        console.log(password);
        return ErrorCode.USER_PASSWORD_NOT_FOUND;
    },
    logout: function(){
        localStorage.remove(_LOGINED);
    }
}