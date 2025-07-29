import { useEffect, useState } from "react";
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
      </div>
    </div>
  );
}

export default Display_food_card;
