export default defineEventHandler(async () => {
  const ai = hubAI(); // access AI bindings
  return await ai.run("@cf/meta/llama-3.1-8b-instruct", {
    prompt: "Who is the author of Nuxt?",
  });
});
