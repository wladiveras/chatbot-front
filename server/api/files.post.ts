export default eventHandler(async (event) => {
  const form = await readFormData(event);
  const file = form.get("file") as File;

  if (!file || !file.size) {
    throw createError({ statusCode: 400, message: "No file provided" });
  }

  ensureBlob(file, {
    maxSize: "16MB",
    types: ["image", "video", "audio"],
  });

  return hubBlob().put(file.name, file, {
    addRandomSuffix: false,
    prefix: "files",
  });
});
