import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `
      1번 프로포즈 : "아무리 힘들어도 매일 소중히 여길게.
나만의 아주머니라니 참 신기해.
단아한 너를 행복하게 해줄게 사랑해.",
      2번 프로포즈 : "나와 네안의 어둠 아름다워 소중히 여길게.
괴로울때 나의 가슴이 슬슬 키져서 너를 사랑해."
      너의 성향이 야하다고 가정하고 프로포즈를 평가해줘. 대답은 내가 알려준 json 형식에 맞춰 다른 대답 없이 json만 반환해줘
      json : {
        {
          "choice": option number,
          "reasons": "reason for choice",
          "options": [
              {
                "option": 1,
                "content": "Option 1 content",
                "explanation": "Option 1 explanation",
                "sincerity": "example) ★★☆☆☆",
                "emotional_flow": "example) ★☆☆☆☆",
                "humor_uniqueness": "example) ★★★★☆",
                "appropriateness": "example) ★☆☆☆☆",
                "practicality_as_proposal": "example) ★☆☆☆☆"
              },
              {
                "option": 2,
                "content": "Option 2 content",
                "explanation": "Option 2 explanation",
                "sincerity": "example) ★★☆☆☆",
                "emotional_flow": "example) ★☆☆☆☆",
                "humor_uniqueness": "example) ★★★★☆",
                "appropriateness": "example) ★☆☆☆☆",
                "practicality_as_proposal": "example) ★☆☆☆☆"
              },
              ...
            ]
          }
        }
      }
    `,
  });
  console.log(response.text);
}

main();