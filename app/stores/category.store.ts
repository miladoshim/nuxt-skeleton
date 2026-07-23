import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
    category: null,
  }),
  actions: {},
});
