import { useState, useEffect } from 'react';

export function useFavorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('recipedia_favorites');
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    const saveFavorites = (updatedFavorites) => {
        setFavorites(updatedFavorites);
        localStorage.setItem('recipedia_favorites', JSON.stringify(updatedFavorites));
    };

    const toggleFavorite = (recipe) => {
        const exists = favorites.find(f => f.id === recipe.id);
        let updated;
        if (exists) {
            updated = favorites.filter(f => f.id !== recipe.id);
        } else {
            updated = [...favorites, recipe];
        }
        saveFavorites(updated);
    };

    const isFavorite = (id) => {
        return favorites.some(f => f.id === Number(id)); // Ensure ID types match
    };

    return { favorites, toggleFavorite, isFavorite };
}
