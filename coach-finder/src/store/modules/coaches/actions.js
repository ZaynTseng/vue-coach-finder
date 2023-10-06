export default {
    async registerCoach(context, payload) {
        const userId = context.rootGetters.getUserId;
        const coachData = {
            ...payload,
        };

        const token = context.rootGetters.getToken;

        const response = await fetch(`https://vue-coach-finder-5e544-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`, {
            method: "PUT",
            body: JSON.stringify(coachData)
        });

        // const responseData = await response.json();

        if (!response.ok) {
            console.log("An error has occurred");
        }

        context.commit("registerCoach", {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context, payload) {
        if (!context.getters.shouldUpdate && !payload.forceRefresh) {
            return;
        }

        const response = await fetch(`https://vue-coach-finder-5e544-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`);
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(response.message || "Failed to fetch data");
        }

        const coaches = [];

        for (const coachId in responseData) {
            const coach = {
                id: coachId,
                firstName: responseData[coachId].firstName,
                lastName: responseData[coachId].lastName,
                areas: responseData[coachId].areas,
                description: responseData[coachId].description,
                hourlyRate: responseData[coachId].hourlyRate
            };
            coaches.push(coach);
        }

        context.commit("setCoaches", coaches);
        context.commit("setFetchTimeStamp", new Date().getTime());
    }
};
