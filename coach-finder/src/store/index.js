import {createStore} from "vuex";

import coachesModule from "@/store/modules/coaches/index";
import requestsModule from "@/store/modules/requests/index";
import authModule from "@/store/modules/auth/index";

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule,
        auth: authModule
    }
});

export default store;
