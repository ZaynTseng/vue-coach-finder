import {createStore} from "vuex";

import coachesModule from "@/store/modules/coaches/index";
import requestsModule from "@/store/modules/requests/index";

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule,
    },
    state() {
        return {
            userId: "c3"
        };
    },
    getters: {
        getUserId(state) {
            return state.userId;
        }
    }
});

export default store;
