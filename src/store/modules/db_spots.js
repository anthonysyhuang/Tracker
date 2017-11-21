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
        },

        [types.ADD_SPOT_ACTION](state, payload){
            let spot = {
                "id": state.spots.length,
                "title": payload.title,
                "lat": payload.lat,
                "lng": payload.lng,
                "locationNum": 0,
                "imgs": []
            };
            for(let i = 0; i < payload.imgs.length; i++){
                spot.imgs.push({
                    "id": i,
                    "path": payload.imgs[i],
                    "tags": []
                })
            }
            console.log(payload);
            state.spots.push(spot)
        }
    },
    actions:{

    }
}