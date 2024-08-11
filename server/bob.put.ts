export default eventHandler(async (event) => {
  return hubBlob().handleUpload(event, {
    formKey: "file",
    multiple: true,
    ensure: {
      types: ["image/jpeg", "image/png", "video/mp4", "audio/mpeg"],
    },
    put: {
      addRandomSuffix: true,
    },
  });
});
