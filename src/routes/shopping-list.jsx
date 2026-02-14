import { useShoppingList } from '../hooks/useShoppingList';
import { Trash2, CheckCircle, Circle, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';

function ShoppingList() {
    const { items, toggleItem, removeItem, clearList } = useShoppingList();

    const sortedItems = [...items].sort((a, b) => {
        // Unchecked first
        return a.checked === b.checked ? 0 : a.checked ? 1 : -1;
    });

    return (
        <div className="min-h-screen bg-stone-50 pb-20">
            <div className="bg-emerald-600 py-12 px-4 shadow-lg text-center text-white">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <h1 className="text-3xl font-black">Shopping List</h1>
                <p className="text-emerald-100 mt-2">{items.length} items needed</p>
            </div>

            <div className="max-w-2xl mx-auto px-4 -mt-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[400px] flex flex-col">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center flex-grow p-10 text-center space-y-4">
                            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center">
                                <ShoppingCart className="w-10 h-10 text-stone-300" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-700">Your list is empty</h3>
                            <p className="text-stone-500 max-w-xs">
                                Browse recipes and click "Add to Shopping List" to get started!
                            </p>
                            <Link to="/" className="bg-emerald-500 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-600 transition flex items-center gap-2">
                                Browse Recipes <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-gray-700">Groceries</h2>
                                <button
                                    onClick={clearList}
                                    className="text-red-500 hover:text-red-600 text-sm font-semibold flex items-center gap-1 hover:bg-red-50 px-3 py-1 rounded-full transition"
                                >
                                    <Trash2 className="w-4 h-4" /> Clear All
                                </button>
                            </div>

                            <div className="space-y-3">
                                <AnimatePresence>
                                    {sortedItems.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className={`flex items-center p-4 rounded-xl border transition-all duration-300 ${item.checked ? 'bg-stone-50 border-stone-100' : 'bg-white border-gray-100 shadow-sm hover:border-emerald-200'}`}
                                        >
                                            <button
                                                onClick={() => toggleItem(item.id)}
                                                className={`flex-shrink-0 mr-4 transition-colors ${item.checked ? 'text-emerald-500' : 'text-gray-300 hover:text-emerald-400'}`}
                                            >
                                                {item.checked ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                                            </button>

                                            <span className={`flex-grow font-medium text-lg leading-snug transition-all ${item.checked ? 'text-gray-400 line-through decoration-2 decoration-gray-200' : 'text-gray-700'}`}>
                                                {item.name}
                                            </span>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 p-2 transition"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export const RouteShoppingList = {
    path: '/shopping-list',
    component: ShoppingList,
};

export default ShoppingList;

