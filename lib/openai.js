import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
//console.log("Loaded API Key:", process.env.OPENAI_API_KEY);




