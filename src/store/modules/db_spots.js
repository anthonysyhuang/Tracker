import * as types from '@/store/mutation-types.js'

export default{
    state:{
        spots:[],
        isSet: false,
    },
    getters:{

    },
    mutations:{

        [types.DB_SPOTS_INIT](state, spots){
            state.spots = spots;
            state.isSet = true;
        }
    },
    actions:{

    }
}