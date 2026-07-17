export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    const data = await $fetch("", {
      method: "POST",
      body: body,
    });

    setCookie(event, "otp_token", data.token, {
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
