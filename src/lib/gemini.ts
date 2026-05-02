/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

let ai: any = null;

export function getAI() {
  if (!ai && apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export async function getChatResponse(history: any[], message: string) {
  const genAI = getAI();
  if (!genAI) return "AI service is currently unavailable. Please check your API key.";

  try {
    const model = "gemini-3-flash-preview";
    const systemInstruction = `
      You are the Charles & Keith AI Stylist. You are professional, sophisticated, and encouraging.
      Your goal is to help customers find the perfect heels.
      You can provide styling advice, help with sizing, and explain the interchangeable heel technology.
      The interchangeable heel technology allows users to switch between Stiletto, Block, and Mid-heels on a single shoe body using a secure twist-and-lock mechanism.
      Always remain polite and helpful. If asked about order tracking, provide a generic "I'll help you find that in your profile" response.
    `;

    const contents = [
      ...history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    const response = await genAI.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't formulate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong. Please try again.";
  }
}

export async function getFitRecommendation(scanData: any) {
  const genAI = getAI();
  if (!genAI) return { recommendedSize: 38, confidence: 0.9, fitType: 'Regular' };

  try {
    const model = "gemini-3-flash-preview";
    const prompt = `Based on these foot scan metrics: ${JSON.stringify(scanData)}, suggest a shoe size for luxury heels. Consider that heels usually require a slightly tighter fit than sneakers. Return your response in JSON format.`;
    
    // Simulating call for now to avoid overusing quota in preview
    return {
      recommendedSize: Math.round(scanData.length / 6.5) + 1, // Simplified mock logic
      confidence: 0.95,
      fitType: scanData.width > 10 ? 'Wide' : 'Regular'
    };
  } catch (error) {
    return { recommendedSize: 38, confidence: 0.8, fitType: 'Regular' };
  }
}
