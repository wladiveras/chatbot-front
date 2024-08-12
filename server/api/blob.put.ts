export default eventHandler(async (event) => {
  return hubBlob().handleUpload(event, {
    formKey: "files",
    multiple: false,
    ensure: {
      types: [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "audio/mpeg",
        "audio/ogg",
        "audio/mp4",
      ],
    },
    put: {
      addRandomSuffix: true,
    },
  });
});
