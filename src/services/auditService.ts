import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AuditResult {
  originalText: string;
  translatedText: string;
  auditSegments: {
    text: string;
    type: 'branding' | 'standard' | 'error' | 'normal';
    comment?: string;
    suggestion?: string;
  }[];
  summary: string;
}

export async function performAudit(
  chineseSource: string,
  englishTranslation: string,
  glossary: string
): Promise<AuditResult> {
  const prompt = `
    You are a meticulous technical translation auditor specializing in cybersecurity and enterprise software.
    
    Task: Perform a deep linguistic and technical audit of the provided English translation against the Chinese source and the Technical Glossary.
    
    CRITICAL REQUIREMENTS:
    1. FULL TEXT INTEGRITY: You MUST return the ENTIRE English Translation provided below, broken into sequential segments. DO NOT skip any words, punctuation, or whitespace. The concatenation of all 'text' fields MUST EXACTLY MATCH the input 'English Translation' character-for-character.
    2. THOROUGHNESS: Identify EVERY instance of:
       - 'branding': Any term found in the Technical Glossary. These are high-priority proprietary terms.
       - 'standard': Common industry-standard technical terms (e.g., EPP, EDR, SaaS, Kernel, ATT&CK, Zero Trust, etc.).
       - 'error': Any mistranslations, grammatical errors, awkward phrasing, or terms that contradict the provided Technical Glossary.
    3. ACCURACY: Prioritize precision. If a term in the translation should have used a glossary term but didn't, mark it as an 'error' and suggest the glossary term.
    
    Inputs:
    - Chinese Source: "${chineseSource}"
    - English Translation: "${englishTranslation}"
    - Technical Glossary: "${glossary}"
    
    Output Format (JSON):
    {
      "auditSegments": [
        { 
          "text": string, 
          "type": "branding" | "standard" | "error" | "normal", 
          "comment": string, 
          "suggestion": string 
        }
      ],
      "summary": string
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          auditSegments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['branding', 'standard', 'error', 'normal'] },
                comment: { type: Type.STRING },
                suggestion: { type: Type.STRING }
              },
              required: ['text', 'type']
            }
          },
          summary: { type: Type.STRING }
        },
        required: ['auditSegments', 'summary']
      }
    }
  });

  return JSON.parse(response.text);
}
