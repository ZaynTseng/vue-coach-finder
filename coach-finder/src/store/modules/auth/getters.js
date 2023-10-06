export default {
    getUserId(state) {
        return state.userId;
    },
    getToken(state) {
        return state.token;
    },
    getLogInState(state) {
        return !!state.token;
    }
};
