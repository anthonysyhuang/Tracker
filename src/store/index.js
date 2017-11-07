import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user.js'
import db_users from '@/store/modules/db_users.js'
import db_spots from '@/store/modules/db_spots.js'

Vue.use(Vuex);
export default new  Vuex.Store({
    modules: {
        db_users,
        db_spots,
        user,
    }
});
