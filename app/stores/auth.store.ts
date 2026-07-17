import { defineStore } from "pinia";

interface AuthState {
  token: string | null;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: () => {
    return { token: null };
  },
  actions: {
    register() {},
    login() {},
    logout() {},
  },
});
