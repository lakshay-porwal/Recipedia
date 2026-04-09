import { Link } from '@tanstack/react-router';
import { Clock, Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

function RecipeCard({ recipe }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="h-full"
        >
            <Link
                to={`/recipe/${recipe.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full bg-white"
            >
                <div className="relative overflow-hidden h-48">
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1">
                        <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                        {recipe.rating}
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                        {recipe.name}
                    </h2>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Flame className="w-4 h-4 text-orange-500" />
                            <span>{recipe.caloriesPerServing} cal</span>
                        </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {recipe.cuisine}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                            {recipe.difficulty}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default RecipeCard;
