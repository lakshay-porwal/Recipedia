import { useState } from 'react';
import { suggestRecipesFromIngredients } from '../utils/gemini';
import { ChefHat, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';

function PantryChef() {
    const [ingredients, setIngredients] = useState("");
    const [mealType, setMealType] = useState("Dinner");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSuggest = async () => {
        if (!ingredients.trim()) return;
        setLoading(true);
        setSuggestions([]);

        // Call AI
        try {
            const result = await suggestRecipesFromIngredients(ingredients, mealType);
            console.log("Pantry Chef Result:", result);
            if (Array.isArray(result)) {
                setSuggestions(result);
            } else {
                console.error("Unexpected format from AI:", result);
                setSuggestions([]);
            }
        } catch (e) {
            console.error("Pantry Chef Error:", e);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-orange-50/50 pb-20">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 py-16 px-4 text-center text-white shadow-lg">
                <div className="flex justify-center mb-4">
                    <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                        <ChefHat className="w-12 h-12" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4">Pantry Chef</h1>
                <p className="text-orange-100 text-lg max-w-xl mx-auto">
                    Tell me what you have, and I'll tell you what to cook!
                </p>
            </div>

            <div className="max-w-3xl mx-auto -mt-8 px-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 text-lg">Your Ingredients</label>
                            <textarea
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                placeholder="e.g. Eggs, milk, flour, spinach..."
                                className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none resize-none text-gray-700 text-lg placeholder:text-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-2 text-lg">Meal Type</label>
                            <select
                                value={mealType}
                                onChange={(e) => setMealType(e.target.value)}
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 focus:outline-none bg-white text-lg"
                            >
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Dessert</option>
                                <option>Snack</option>
                            </select>
                        </div>

                        <button
                            onClick={handleSuggest}
                            disabled={loading || !ingredients.trim()}
                            className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl text-xl hover:bg-orange-700 transition shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? 'Thinking...' : 'Find Recipes'}
                            {!loading && <ArrowRight className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Results Area */}
                {(suggestions.length > 0) && (
                    <div className="mt-12 space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-800 text-center">Chef's Suggestions</h2>
                        <div className="grid gap-4">
                            {suggestions.map((dish, i) => (
                                <Link
                                    key={i}
                                    to={`/recipe/ai-${encodeURIComponent(dish)}`}
                                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md hover:border-orange-200 transition group cursor-pointer"
                                >
                                    <span className="text-lg font-semibold text-gray-700 group-hover:text-orange-600 transition">{dish}</span>
                                    <div className="bg-orange-50 text-orange-600 p-2 rounded-full group-hover:bg-orange-600 group-hover:text-white transition">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


export const RoutePantry = {
    path: '/pantry',
    component: PantryChef,
};

export default PantryChef;

