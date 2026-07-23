import { defineStore } from "pinia";

interface AuthState {
  token: string | null;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    authToken: null,
  }),
  actions: {
    async register(credentials) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch(
          `${config.public.apiBaseUrl}/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          },
        );

        const data = await response.json();

        if (response.status !== 201) {
          // Handle validation errors specifically
          if (typeof data === "object" && data !== null) {
            const errors = Object.values(data);
            if (errors.length > 0 && errors[0].length > 0) {
              // Extract the first error message from the first property with an error
              throw new Error(errors[0][0]);
            }
          }

          // Fallback error message if the structure wasn't as expected
          throw new Error("Registration failed due to an unexpected error.");
        } else {
          return data; // On success, return the response data
        }
      } catch (error) {
        console.error(error);
        return {
          error: error.message || "An error occurred during registration.",
        };
      }
    },
    async login(credentials) {
      try {
        const config = useRuntimeConfig();
        const response = await $fetch(`${config.public.apiUrl}users/token/`, {
          method: "POST",
          body: JSON.stringify(credentials),
        });

        const authToken = response;

        const user = jwtDecode(authToken.access);
        this.user = user;
        this.isAuthenticated = true;
        this.authToken = authToken;

        localStorage.setItem("authToken", JSON.stringify(authToken));
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("authTokens");
    },
    checkAuth() {
      this.authToken = JSON.parse(localStorage.getItem("authToken"));
      if (this.authToken) {
        this.isAuthenticated = true;
        this.user = jwtDecode(this.authToken.access);
      }
    },
    async authedRequest(url, originalConfig = {}) {
      const config = { ...originalConfig };
      // Explained below
      const accessToken = await this.retrieveValidToken();

      if (!accessToken) {
        return Promise.reject("No auth token found");
      }

      if (!config.headers) {
        config.headers = {};
      }
      config.headers["Authorization"] = `Bearer ${accessToken}`;

      if (config.data) {
        config.body = config.data;
        delete config.data;
      }

      try {
        return await fetch(url, config);
      } catch (error) {
        console.error("Failed to make authenticated request:", error);
        return Promise.reject(error);
      }
    },
    async makeRequest(method, url, data = {}, config = {}) {
      config.method = method;
      if (data && Object.keys(data).length > 0) {
        config.data = data;
      }
      return await this.authedRequest(url, config);
    },
    async authedPost(url, data, config = {}) {
      return this.makeRequest("POST", url, data, config);
    },
    async authedPut(url, data, config = {}) {
      return this.makeRequest("PUT", url, data, config);
    },
    async authedGet(url, config = {}) {
      return this.makeRequest("GET", url, null, config);
    },
    async authedDelete(url, config = {}) {
      return this.makeRequest("DELETE", url, null, config);
    },
    async retrieveValidToken() {
      this.authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!this.authTokens) {
        return null;
      }

      const user = jwtDecode(this.authTokens.access);
      // Set isExpired to true if token expires in less than a minute from now
      const isExpired = dayjs.unix(user.exp).diff(dayjs(), "minute") < 1;

      if (isExpired) {
        try {
          const newTokens = await this.refreshToken();
          if (newTokens) {
            localStorage.setItem("authTokens", JSON.stringify(newTokens));
            this.authTokens = newTokens;
            this.user = jwtDecode(newTokens.access);

            return newTokens.access;
          }
        } catch (err) {
          console.error("Error refreshing token", err);
          return null;
        }
      }

      return this.authTokens.access;
    },
    async refreshToken() {
      const rToken = this.authTokens?.refresh;
      if (!rToken) {
        console.error("No refresh token available");
        return null;
      }

      try {
        const config = useRuntimeConfig();
        const response = await $fetch(
          `${config.public.apiUrl}users/token/refresh/`,
          {
            method: "POST",
            body: JSON.stringify({ refresh: rToken }),
          },
        );
        return response;
      } catch (error) {
        console.error("Failed to refresh token:", error);
        this.logout();
        return null;
      }
    },
  },
});
