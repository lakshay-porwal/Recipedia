import { useEffect, useState } from "react";
<<<<<<< HEAD
// import { useNavigate } from 'react-router-dom';
import { useRouter } from "@tanstack/react-router";

function Display_food_card() {
  const router = useRouter();

  const [card_food, setcard_food] = useState([]);
  const [dish, setdish] = useState("");
  const [message, setmessage] = useState("");
  const [printdata, setprintdata] = useState(false);

  async function fetch_recipe(item) {
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${item}`
      );
      const data = await response.json();

      if (data.recipes.length === 0) {
        setmessage("❌ No matching dish found.");
        setcard_food([]);
      } else {
        setprintdata(true);
        setcard_food(data.recipes);
        setmessage("");
      }
    } catch (err) {
      console.log(err);
      setmessage("Something went wrong.");
    }
  }

  useEffect(() => {
    if (!printdata) {
      setmessage("🔍 Enter a dish name to search.");
    } else {
      fetch_recipe("pizza");
    }
  }, []);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Dish name"
          value={dish}
          onChange={(e) => setdish(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetch_recipe(dish);
            }
          }}
          className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <button
          onClick={() => fetch_recipe(dish)}
          className="bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition  cursor-pointer"
        >
          Search
        </button>
        <p className="text-red-600 font-medium">{message}</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {card_food.map((value) => (
          <div
            key={value.id}
            onClick={() => router.navigate({ to: `/recipe/${value.id}` })}
            className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
          >
            <img
              src={value.image}
              alt={value.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold">{value.name}</h2>
              <p className="text-sm">
                ⏱ {value.prepTimeMinutes + value.cookTimeMinutes} mins
              </p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>🍽 {value.cuisine}</span>
                <span>⭐ {value.difficulty}</span>
              </div>
            </div>
          </div>
        ))}
=======
import { Link } from "@tanstack/react-router";
import Hero from "./Hero";
import RecipeCard from "./RecipeCard";

const CATEGORIES = [
  "All", "Pizza", "Pasta", "Salad", "Dessert", "Breakfast", "Chicken", "Vegetarian", "Seafood"
];

function Display_food_card() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  async function fetchRecipes(query) {
    setLoading(true);
    setMessage("");
    try {
      const url = query
        ? `https://dummyjson.com/recipes/search?q=${query}`
        : `https://dummyjson.com/recipes`; // Fetch all initially if query is empty

      const response = await fetch(url);
      const data = await response.json();

      if (data.recipes.length === 0) {
        setMessage("❌ No recipes found. Try another search!");
        setRecipes([]);
      } else {
        setRecipes(data.recipes);
      }
    } catch (err) {
      console.log(err);
      setMessage("Failed to load recipes.");
    } finally {
      setLoading(false);
    }
  }

  // Initial load
  useEffect(() => {
    fetchRecipes("");
  }, []);

  const handleSearch = (query) => {
    setActiveCategory("All"); // Reset category on search
    fetchRecipes(query);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      fetchRecipes("");
    } else {
      fetchRecipes(category);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Hero onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Categories */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Categories</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-6 py-2 rounded-full font-medium transition whitespace-nowrap px-8 ${activeCategory === cat
                  ? "bg-emerald-600 text-white shadow-md transform scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="bg-white rounded-2xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {recipes.length === 0 && activeCategory === 'All' && (
              <div className="text-center my-10 space-y-4">
                <p className="text-xl text-gray-500">No standard recipes found.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <div
                    className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white cursor-pointer hover:scale-105 transition flex flex-col items-center justify-center text-center h-80"
                    onClick={() => {
                      const dishName = document.querySelector('input[type="text"]')?.value || "Magic Dish";
                      window.location.href = `/recipe/ai-${encodeURIComponent(dishName)}`;
                    }}
                  >
                    <span className="text-4xl mb-4">✨</span>
                    <h3 className="text-2xl font-bold mb-2">Generate with AI</h3>
                    <p className="text-indigo-100">Chef AI can create a custom recipe for "{document.querySelector('input[type="text"]')?.value || "your dish"}" instantly!</p>
                  </div>
                </div>
              </div>
            )}

            {recipes.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </>
        )}
>>>>>>> 93149ce (enahnce features)
      </div>
    </div>
  );
}

export default Display_food_card;
