import { GoogleGenAI } from "@google/genai";
import { HOTSPOTS } from "../data";

let ai: GoogleGenAI | null = null;

export const initializeGemini = (apiKey: string) => {
  ai = new GoogleGenAI({ apiKey });
};

export const generateCityGuideResponse = async (userQuery: string): Promise<string> => {
  if (!ai) {
    throw new Error("Gemini AI not initialized. Please set API Key.");
  }

  // Prepare context from our dataset
  const context = JSON.stringify(HOTSPOTS.map(h => ({
    label: h.label,
    district: h.districtId,
    summary: h.summary,
    details: h.description,
    metrics: h.metrics
  })));

  const systemInstruction = `
    You are the "City Guide" for Career City, an interactive resume map for Michael Findling.
    Your tone is professional yet enthusiastic, like a theme park tour guide.
    
    Here is the data about the city (Michael's Resume):
    ${context}

    Answer the user's question based strictly on this data. 
    If they ask about the districts, explain the theme of that district.
    Wall Street = Finance/Early Career.
    Silicon Valley = Tech/SaaS.
    Marketing = Skills/Strategy.
    Technologies = Tools.
    Industries = Sectors.

    Keep answers concise (under 3 paragraphs).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm having trouble connecting to the city archives right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Communication with the City Guide satellite is interrupted. Please check your API key.";
  }
};