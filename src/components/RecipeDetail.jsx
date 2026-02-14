import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
<<<<<<< HEAD

function RecipeDetail() {

const params = useParams({ from: '/recipe/$id' });
const { id } = params;
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipeById() {
      try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
        setLoading(false);
      } catch {
        setError("Failed to load recipe.");
=======
import { getRecipeInsights, askChefAI, generateFullRecipe } from '../utils/gemini';
import { useFavorites } from '../hooks/useFavorites';
import { useShoppingList } from '../hooks/useShoppingList';
import { Heart, Clock, Utensils, Star, Flame, ArrowLeft, Send, ShoppingCart, Check } from 'lucide-react';

function RecipeDetail() {
  const params = useParams({ from: '/recipe/$id' });
  const { id } = params;
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [aiInsights, setAiInsights] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();
  const [isFav, setIsFav] = useState(false);

  const { addItems } = useShoppingList();
  const [addedToCart, setAddedToCart] = useState(false);


  const handleAddToCart = () => {
    if (recipe && recipe.ingredients) {
      addItems(recipe.ingredients);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        let data;

        // Check if this is an AI-generated recipe request
        if (id.startsWith('ai-')) {
          const dishName = decodeURIComponent(id.replace('ai-', ''));
          data = await generateFullRecipe(dishName);
        } else {
          // Standard fetch
          const response = await fetch(`https://dummyjson.com/recipes/${id}`);
          if (!response.ok) throw new Error("Recipe not found");
          data = await response.json();
        }

        if (!data) throw new Error("Could not load recipe");

        setRecipe(data);
        setIsFav(isFavorite(data.id));

        // Fetch AI insights
        fetchAiInsights(data.name);

      } catch (err) {
        console.error(err);
        setError("Failed to load recipe. It might not exist.");
      } finally {
>>>>>>> 93149ce (enahnce features)
        setLoading(false);
      }
    }

<<<<<<< HEAD
    fetchRecipeById();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error || !recipe) return <p className="text-center mt-10 text-red-500">{error || "Recipe not found."}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => history.back()}
        className="mb-6 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition"
      >
        ⬅ Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full max-h-[400px] object-cover rounded-xl shadow-lg mb-6"
      />
      <div className="space-y-2">
        <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
        <p><strong>Total Time:</strong> {recipe.prepTimeMinutes + recipe.cookTimeMinutes} minutes</p>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1">
          {recipe.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
=======
    fetchData();
  }, [id]);

  // Sync favorite state when it changes elsewhere or on load
  useEffect(() => {
    if (recipe) setIsFav(isFavorite(recipe.id));
  }, [recipe, isFavorite]);

  async function fetchAiInsights(dishName) {
    setAiLoading(true);
    const insights = await getRecipeInsights(dishName);
    setAiInsights(insights);
    setAiLoading(false);
  }

  async function handleChatSubmit() {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', message: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    setChatLoading(true);
    setChatInput("");

    const response = await askChefAI(chatHistory, chatInput);
    setChatHistory(prev => [...prev, { role: 'model', message: response }]);
    setChatLoading(false);
  }

  const handleToggleFavorite = () => {
    if (recipe) {
      toggleFavorite(recipe);
      setIsFav(!isFav);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen text-emerald-600 font-bold text-lg">Loading Deliciousness...</div>;
  if (error || !recipe) return <div className="text-center mt-10 text-red-500 font-medium">{error || "Recipe not found."}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <button
        onClick={() => history.back()}
        className="mb-6 px-4 py-2 text-gray-600 hover:text-emerald-600 transition flex items-center gap-2 font-medium"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Search
      </button>

      {/* Main Recipe Header */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
        <div className="relative h-64 md:h-96">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-white">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{recipe.name}</h1>
                <div className="flex items-center gap-4 text-sm md:text-base font-medium opacity-90">
                  <span className="flex items-center gap-1"><Utensils className="w-5 h-5" /> {recipe.cuisine}</span>
                  <span className="flex items-center gap-1"><Clock className="w-5 h-5" /> {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                  <span className="flex items-center gap-1"><Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> {recipe.rating} ({recipe.reviewCount} reviews)</span>
                </div>
              </div>
              <button
                onClick={handleToggleFavorite}
                className={`p-3 rounded-full transition-all shadow-lg ${isFav ? 'bg-white text-red-500' : 'bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500'}`}
              >
                <Heart className={`w-8 h-8 ${isFav ? 'fill-red-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* AI Insight Bar */}
        <div className="p-6 md:p-8 bg-emerald-50/50 border-b border-emerald-100">
          {aiLoading ? (
            <div className="animate-pulse flex gap-4">
              <div className="w-12 h-12 bg-emerald-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-emerald-200 rounded w-3/4"></div>
                <div className="h-4 bg-emerald-200 rounded w-1/2"></div>
              </div>
            </div>
          ) : aiInsights ? (
            <div className="flex gap-4 items-start">
              <div className="bg-emerald-100 p-2 rounded-full">
                <Star className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-800 text-lg mb-1">Chef's Insight</h3>
                <p className="text-emerald-700 leading-relaxed">{aiInsights.description}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column: Ingredients & Nutrition */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-100 pb-2">Ingredients</h3>
            <ul className="space-y-3">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-100 pb-2">Nutrition & Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600 font-medium">Calories</span>
                <span className="text-emerald-600 font-bold">{recipe.caloriesPerServing} kcal</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600 font-medium">Difficulty</span>
                <span className={`font-bold ${recipe.difficulty === 'Easy' ? 'text-green-600' :
                  recipe.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>{recipe.difficulty}</span>
              </div>
              {aiInsights && aiInsights.nutrition && (
                <>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-600 font-medium">Protein</span>
                    <span className="text-gray-800 font-bold">{aiInsights.nutrition.protein}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-600 font-medium">Carbs</span>
                    <span className="text-gray-800 font-bold">{aiInsights.nutrition.carbs}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {aiInsights && aiInsights.substitutes && Object.keys(aiInsights.substitutes).length > 0 && (
            <div className="bg-orange-50 p-6 rounded-2xl shadow-sm border border-orange-100">
              <h3 className="text-xl font-bold mb-4 text-orange-800 flex items-center gap-2">
                <Flame className="w-5 h-5" /> Substitutes
              </h3>
              <ul className="space-y-2 text-orange-900">
                {Object.entries(aiInsights.substitutes).map(([key, val]) => (
                  <li key={key}><strong>{key}:</strong> {val}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Instructions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Instructions</h3>
            <div className="space-y-6">
              {recipe.instructions.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ask Chef AI */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-xl overflow-hidden text-white">
            <div className="p-6 border-b border-emerald-500/30">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span>👩‍🍳</span> Ask Chef AI
              </h2>
              <p className="text-emerald-100 opacity-90">Got a question about this recipe? Ask away!</p>
            </div>

            <div className="p-6 bg-white/5 h-80 overflow-y-auto space-y-4">
              {chatHistory.length === 0 && (
                <div className="text-center text-emerald-100/50 italic mt-20">
                  Ask about cooking time, allergens, or serving suggestions...
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user'
                    ? 'bg-white text-emerald-800 rounded-br-sm'
                    : 'bg-emerald-800/50 backdrop-blur text-white rounded-bl-sm border border-emerald-500/30'
                    }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
              {chatLoading && <div className="text-emerald-200 text-sm animate-pulse">Chef is thinking...</div>}
            </div>

            <div className="p-4 bg-white/10 backdrop-blur-md">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                  placeholder="Type your question..."
                  className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder:text-emerald-200/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  onClick={handleChatSubmit}
                  disabled={chatLoading}
                  className="bg-white text-emerald-700 p-3 rounded-xl hover:bg-emerald-50 transition active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Dishes */}
      {aiInsights && aiInsights.similarDishes && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">You might also like</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {aiInsights.similarDishes.map((dish, i) => (
              <div key={i} className="flex-shrink-0 bg-white shadow-sm border border-gray-100 px-6 py-4 rounded-xl font-medium text-gray-700 whitespace-nowrap hover:shadow-md hover:border-emerald-200 transition cursor-default">
                🍽 {dish}
              </div>
            ))}
          </div>
        </div>
      )}

>>>>>>> 93149ce (enahnce features)
    </div>
  );
}

export default RecipeDetail;
