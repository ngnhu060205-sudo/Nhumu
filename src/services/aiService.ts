import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getAiRecommendations(userInput: {
  budget: string;
  gender: string;
  peopleCount: string;
  priorities: string[];
  rooms: any[];
}) {
  const prompt = `
    Dựa trên danh sách phòng trọ hiện có và nhu cầu của sinh viên, hãy gợi ý 2-3 phòng phù hợp nhất.
    
    Nhu cầu sinh viên:
    - Ngân sách: ${userInput.budget} VNĐ/tháng
    - Giới tính: ${userInput.gender}
    - Số người ở: ${userInput.peopleCount}
    - Ưu tiên: ${userInput.priorities.join(", ")}
    
    Danh sách phòng hiện có:
    ${JSON.stringify(userInput.rooms)}
    
    Hãy trả về kết quả dưới dạng JSON với cấu trúc:
    {
      "recommendations": [
        {
          "roomId": "id của phòng",
          "reason": "Lý do tại sao phòng này phù hợp (giải thích chi tiết, thân thiện với sinh viên)"
        }
      ],
      "advice": "Lời khuyên chung cho sinh viên khi đi thuê trọ dựa trên nhu cầu của họ"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  roomId: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["roomId", "reason"]
              }
            },
            advice: { type: Type.STRING }
          },
          required: ["recommendations", "advice"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    throw error;
  }
}
