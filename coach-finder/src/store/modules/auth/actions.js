let timer;

export default {
    logout(context, payload) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpires");

        clearTimeout(timer);

        context.commit("setUser", {
            token: null,
            userId: null,
        });
    },
    async login(context, payload) {
        await context.dispatch("auth", {
            ...payload,
            mode: "login"
        });
    },
    async signup(context, payload) {
        await context.dispatch("auth", {
            ...payload,
            mode: "signup"
        });
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = "";
        if (mode === "login") {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2wpiXxp2M4aClA3aCWx12HO8TqfO4JiY";
        }
        if (mode === "signup") {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2wpiXxp2M4aClA3aCWx12HO8TqfO4JiY";
        }

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(response.message || "Failed to signup as a new user.");
        }

        const expirationIn = +responseData.expiresIn * 1000;
        const expirationTime = new Date().getTime() + expirationIn;

        localStorage.setItem("token", responseData.idToken);
        localStorage.setItem("userId", responseData.localId);
        localStorage.setItem("tokenExpires", expirationTime);

        timer = setTimeout(function () {
            context.dispatch("logout");
        }, expirationIn);

        context.commit("setUser", {
            token: responseData.idToken,
            userId: responseData.localId,
        });
    },
    async autoLogin(context) {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const tokenExpires = localStorage.getItem("tokenExpires");

        const expirationIn = +tokenExpires - new Date().getTime();

        if (expirationIn < 0) {
            return;
        }

        timer = setTimeout(function () {
            context.dispatch("logout");
        }, expirationIn);

        if (token && userId && tokenExpires) {
            context.commit("setUser", {
                token,
                userId,
            });
        }
    }
};
