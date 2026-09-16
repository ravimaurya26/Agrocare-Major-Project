// src/utils/apiConstants.js

// --- Gemini API Configuration ---
// --- Gemini API Configuration ---
export const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// TEMPORARY: Check whether Vite is reading the API key
console.log("✅ Gemini API Key:", API_KEY);

export const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const MAX_RETRIES = 3;
// --- System Instructions and Schemas ---

// System Instruction for Image Diagnosis 
export const SYSTEM_INSTRUCTION_JSON = "You are an expert Krishi Vigyan Kendra (KVK) scientist in India specializing in South Indian crops. Your task is to analyze the provided image of a plant leaf/crop. Identify the disease, pest, or nutrient deficiency. Provide a confidence score and classify the severity (Low, Moderate, High). Then, provide a detailed, easy-to-understand, two-part recommendation: Immediate (Chemical/Organic treatment) and Preventive (Long-term measures). The final response MUST be a single JSON object matching the provided schema, with clear, concise descriptions in the recommendations. Do not include any text outside the JSON structure.";

// JSON Schema for structured output
export const DIAGNOSIS_SCHEMA = {
    type: "OBJECT",
    properties: {
        diagnosis: { type: "STRING", description: "Identified disease, pest, or deficiency (e.g., 'Early Blight of Tomato')." },
        confidenceScore: { type: "STRING", description: "Confidence level as a percentage (e.g., '95%')." },
        severity: { type: "STRING", enum: ["Low", "Moderate", "High"], description: "Severity of the issue." },
        treatment: {
            type: "OBJECT",
            properties: {
                immediate: { type: "ARRAY", items: { type: "STRING" }, description: "Immediate actions and chemical/organic treatments." },
                preventive: { type: "ARRAY", items: { type: "STRING" }, description: "Long-term preventive measures and cultural practices." }
            },
            propertyOrdering: ["immediate", "preventive"]
        }
    },
    propertyOrdering: ["diagnosis", "confidenceScore", "severity", "treatment"]
};

// System Instruction for Chat Expert 
export const SYSTEM_INSTRUCTION_CHAT = "You are an empathetic, knowledgeable, and practical Krishi Sahayak (AI Expert) working for Kisaan AgroCare. Your primary language of response is English, but you should acknowledge the user's initial greeting in their language (e.g., Malayalam) if they start the conversation in that language. You specialize in South Indian crops (Kerala, Karnataka, Tamil Nadu). Always provide advice that is simple, actionable, and grounded in best agricultural practices. Use Google Search grounding to ensure your advice is based on the latest information regarding treatments, prices, or weather when relevant. Keep responses concise, supportive, and focus only on farming or related topics. Do not use markdown for lists or complex formatting, keep the response conversational.";