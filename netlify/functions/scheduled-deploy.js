import fetch from "node-fetch";
import { schedule } from "@netlify/functions";

const BUILD_HOOK =
  "https://api.netlify.com/build_hooks/5eef8de87588de325a84b57c";

// Run daily at 2am
const handler = schedule("0 2 * * *", async () => {
  const res = await fetch(BUILD_HOOK, {
    method: "POST",
  })
  console.log("Build hook response:", res);

  return {
    statusCode: 200,
  };
});

export { handler };
