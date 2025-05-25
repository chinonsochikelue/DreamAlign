import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "dream-align", // Unique app ID
  name: "DreamAlign",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});