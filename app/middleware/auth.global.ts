function isAuthenticated(): boolean {
  return false;
}

export default defineNuxtRouteMiddleware((to, from) => {
  console.log("auth global middleware");
  //   if (isAuthenticated() === false) {
  //     return navigateTo("/auth/login");
  //   }
});
