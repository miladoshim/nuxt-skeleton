export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    const data = await $fetch("", {
      method: "POST",
      body: body,
    });
  } catch (e) {
    console.error(e);
    return e;
  }
});
