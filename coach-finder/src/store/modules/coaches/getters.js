export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(state, getters, rootState, rootGetters) {
        const coaches = getters.coaches;
        const userId = rootGetters.getUserId;
        return coaches.some(coach => coach.id === userId);
    },
    shouldUpdate(state) {
        const lastUpdate = state.lastFetchTimeStamp;
        const currentTime = new Date().getTime();
        if (!lastUpdate) {
            return true;
        }
        return (currentTime - lastUpdate) / 1000 > 60; // meaning it is more than 1 min ago
    }
};
