
// === Diagnosis API Configuration ===
// Diagnosis is handled by your own ML model through the backend.
// No Gemini API key is required in the frontend.

export const DIAGNOSIS_API_URL = "/api/diagnosis";

// Number of retries for failed API calls
export const MAX_RETRIES = 3;


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

export const CROPS = [
  "Paddy (Rice)",
  "Banana",
  "Coconut",
  "Pepper",
  "Cardamom",
  "Ginger"
];

export const REGIONS = [
  "Kottayam, Kerala",
  "Coimbatore, Tamil Nadu",
  "Mysuru, Karnataka",
  "Rural Andhra Pradesh"
];

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

