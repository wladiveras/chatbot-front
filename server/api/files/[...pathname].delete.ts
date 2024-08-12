export default eventHandler(async (event) => {
  const { pathname } = getRouterParams(event);

  await hubBlob().del(pathname);

  return sendNoContent(event);
});
