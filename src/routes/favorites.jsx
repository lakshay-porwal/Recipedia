import { useFavorites } from '../hooks/useFavorites';
import RecipeCard from '../components/RecipeCard';
import { Link } from '@tanstack/react-router';
import { HeartOff } from 'lucide-react';

function Favorites() {
    const { favorites } = useFavorites();

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-emerald-600 py-12 px-4 shadow-lg text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Cookbook</h1>
                <p className="text-emerald-100">Your collection of favorite recipes</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-white rounded-xl shadow-sm p-6 min-h-[400px]">
                    {favorites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
                            <HeartOff className="w-16 h-16 mb-4 text-gray-300" />
                            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
                            <p className="mb-6">Start exploring to add delicious recipes here!</p>
                            <Link to="/" className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition shadow-md font-medium">
                                Browse Recipes
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {favorites.map(recipe => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export const RouteFavorites = {
    path: '/favorites',
    component: Favorites,
};

export default Favorites;

