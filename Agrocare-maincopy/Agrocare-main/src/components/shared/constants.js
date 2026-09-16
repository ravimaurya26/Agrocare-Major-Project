// === Gemini API & Configuration ===

// ⚠️ Replace this with your actual Gemini API key from Google AI Studio
// Get yours from: https://makersuite.google.com/app/apikey
export const API_KEY = "AIzaSyCCzLVi66vD7dS6b03QJyOXUFOoGV902SQ"; 

// Gemini 1.5-t endpoint (most stable for now)
export const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-t:generateContent";

// Number of retries for failed API calls
export const MAX_RETRIES = 3;

// === Diagnosis System Configuration ===

// System Instruction for Image Diagnosis
export const SYSTEM_INSTRUCTION_JSON = `
You are an expert Krishi Vigyan Kendra (KVK) scientist in India specializing in South Indian crops.
Analyze the provided crop/leaf image.
Identify the disease, pest, or nutrient deficiency.
Provide a confidence score and classify the severity (Low, Moderate, High).
Provide detailed, easy-to-understand recommendations:
Immediate (Chemical/Organic treatment) and Preventive (Long-term measures).
The final response MUST be a single JSON object matching the provided schema.
Do not include text outside the JSON structure.
`;

// JSON Schema for structured AI output
export const DIAGNOSIS_SCHEMA = {
  type: "OBJECT",
  properties: {
    diagnosis: { type: "STRING", description: "Identified disease, pest, or deficiency." },
    confidenceScore: { type: "STRING", description: "Confidence level as a percentage." },
    severity: { type: "STRING", enum: ["Low", "Moderate", "High"], description: "Severity level." },
    treatment: {
      type: "OBJECT",
      properties: {
        immediate: { type: "ARRAY", items: { type: "STRING" }, description: "Immediate treatment steps." },
        preventive: { type: "ARRAY", items: { type: "STRING" }, description: "Long-term preventive measures." }
      },
      propertyOrdering: ["immediate", "preventive"]
    }
  },
  propertyOrdering: ["diagnosis", "confidenceScore", "severity", "treatment"]
};

// === Chat System Configuration ===

export const SYSTEM_INSTRUCTION_CHAT = `
You are an empathetic and knowledgeable "Krishi Sahayak" (AI Expert) for Kisaan AgroCare.
Primary language is English; acknowledge greetings in local languages (Malayalam, Tamil, Kannada).
Specialize in South Indian crops.
Provide simple, actionable, research-backed advice.
Stay focused on agriculture-related topics.
Keep responses conversational and concise.
`;

// === Market Data Constants ===
export const CROPS = ["Paddy (Rice)", "Banana", "Coconut", "Pepper", "Cardamom", "Ginger"];
export const REGIONS = ["Kottayam, Kerala", "Coimbatore, Tamil Nadu", "Mysuru, Karnataka", "Rural Andhra Pradesh"];
export const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];