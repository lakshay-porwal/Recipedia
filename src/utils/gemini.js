import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

/* ---------- INIT GEMINI ---------- */
if (!API_KEY) {
    console.error("❌ VITE_GEMINI_API_KEY is not set in .env file");
} else {
    genAI = new GoogleGenerativeAI(API_KEY);

    model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash", // ✅ CORRECT MODEL
    });

    console.log("✅ Gemini AI Initialized (gemini-1.5-flash)");
}

/* ---------- HELPER: SAFE JSON PARSER ---------- */
const safeJSONParse = (text) => {
    try {
        // Remove markdown code blocks if present
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const match = cleanedText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        return match ? JSON.parse(match[0]) : null;
    } catch (e) {
        console.error("❌ JSON Parse Failed. Raw text:", text);
        return null;
    }
};


/* ---------- 1️⃣ DISH INSIGHTS ---------- */
export const getRecipeInsights = async (dishName) => {
    if (!model) return null;

    const prompt = `
You are an intelligent Chef AI.
Generate insights for the dish "${dishName}".

Return ONLY valid JSON in this format:
{
  "description": "Short appetizing description",
  "nutrition": { "calories": "", "protein": "", "carbs": "" },
  "substitutes": { "ingredient": "substitute" },
  "similarDishes": ["dish1", "dish2", "dish3"],
  "beginnerTips": "Helpful cooking tip"
}
`;

    try {
        const result = await model.generateContent(prompt);
        return safeJSONParse(result.response.text());
    } catch (error) {
        console.error("❌ getRecipeInsights error:", error);
        return null;
    }
};

/* ---------- 2️⃣ FULL AI RECIPE ---------- */
export const generateFullRecipe = async (dishName) => {
    if (!model) return null;

    const prompt = `
You are an expert Chef AI.
Create a complete recipe for "${dishName}" (serves 4).

Return ONLY valid JSON:
{
  "id": "ai-${Date.now()}",
  "name": "${dishName}",
  "ingredients": ["1 cup flour", "2 eggs"],
  "instructions": ["Step 1...", "Step 2..."],
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 30,
  "difficulty": "Medium",
  "cuisine": "Global",
  "caloriesPerServing": 450,
  "image": "https://placehold.co/600x400?text=${encodeURIComponent(dishName)}",
  "rating": 4.7,
  "reviewCount": 120
}
`;

    try {
        const result = await model.generateContent(prompt);
        return safeJSONParse(result.response.text());
    } catch (error) {
        console.error("❌ generateFullRecipe error:", error);
        return null;
    }
};

/* ---------- 3️⃣ INGREDIENT → RECIPES ---------- */
export const suggestRecipesFromIngredients = async (ingredients, mealType) => {
    if (!model) return [];

    // START FIX: Ensure ingredients is a string for the prompt
    const ingredientsList = Array.isArray(ingredients) ? ingredients.join(", ") : ingredients;

    const prompt = `
You are a creative Chef AI.
Ingredients: ${ingredientsList}
Meal type: ${mealType}

Return ONLY a JSON array of 5 recipe names.
`;

    try {
        const result = await model.generateContent(prompt);
        return safeJSONParse(result.response.text()) || [];
    } catch (error) {
        console.error("❌ suggestRecipes error:", error);
        return [];
    }
};

/* ---------- 4️⃣ ASK CHEF (CHAT) ---------- */
export const askChefAI = async (history, question) => {
    if (!model) return "AI service unavailable.";

    const chat = model.startChat({
        history: history.map(msg => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.message }]
        }))
    });

    try {
        const result = await chat.sendMessage(question);
        // START FIX: await the response promise
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("❌ askChefAI error:", error);
        return "⚠️ Error occurred while asking AI.";
    }
};

