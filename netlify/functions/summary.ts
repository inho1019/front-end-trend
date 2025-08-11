import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const contents = JSON.parse(event.body);
    if (!contents) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Contents are required" }),
      };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ summary: response.text }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}