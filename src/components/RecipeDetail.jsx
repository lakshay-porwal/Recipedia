import { useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

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
        setLoading(false);
      }
    }

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
    </div>
  );
}

export default RecipeDetail;
