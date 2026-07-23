import { defineStore } from "pinia";

interface UserState {
  mobile: String;
  is_coach: Boolean;
}

export const useUserStore = defineStore("user", {
  state: () => ({}),
});
