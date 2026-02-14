import { useState, useEffect } from 'react';

export function useShoppingList() {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('shopping-list');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('shopping-list', JSON.stringify(items));
    }, [items]);

    const addItems = (newItems) => {
        setItems(prev => {
            // Create a set of existing item names for duplicate checking (simple logic)
            const existingNames = new Set(prev.map(i => i.name));

            const uniqueNewItems = newItems
                .filter(i => !existingNames.has(i))
                .map(i => ({ name: i, checked: false, id: Date.now() + Math.random() }));

            return [...prev, ...uniqueNewItems];
        });
    };

    const toggleItem = (id) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const removeItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const clearList = () => setItems([]);

    return { items, addItems, toggleItem, removeItem, clearList };
}
