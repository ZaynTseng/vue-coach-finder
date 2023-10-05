export default {
    requests(state, getters, rootsate, rootgetters) {
        const coachId = rootgetters.getUserId;
        return state.requests.filter(req => req.coachId === coachId);
    },
    hasRequests(state, getters) {
        return getters.requests && getters.requests.length > 0;
    }
};
