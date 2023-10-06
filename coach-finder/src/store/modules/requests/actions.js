export default {
    async addRequest(context, payload) {
        const newRequest = {
            coachId: payload.id,
            email: payload.email,
            message: payload.message
        };

        const response = await fetch(`https://vue-coach-finder-5e544-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.id}.json`, {
            method: "POST",
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        newRequest.id = responseData.name; // name is the automatically generated id for this entry

        if (!response.ok) {
            throw new Error(response.message || "Failed to send data to the server");
        }

        context.commit("addRequest", newRequest);
    },
    async fetchRequests(context, payload) {
        const coachId = context.rootGetters.getUserId;
        const token = context.rootGetters.getToken;
        const response = await fetch(`https://vue-coach-finder-5e544-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`);
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(response.message || "Failed to fetch data");
        }

        const requests = [];

        for (const id in responseData) {
            const request = {
                id: id,
                coachId: coachId,
                email: responseData[id].email,
                message: responseData[id].message,
            };
            requests.push(request);
        }

        context.commit("setRequest", requests);
    }
};
