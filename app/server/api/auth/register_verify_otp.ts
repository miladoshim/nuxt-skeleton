export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  const token = getCookie(event, "token");

  try {
    const data = await $fetch("", {
      method: "POST",
      body: body,
    });

    deleteCookie(event, "login_token");

    setCookie(event, "register_token", data.register_token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
});
