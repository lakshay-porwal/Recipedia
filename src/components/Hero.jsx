import { Search } from 'lucide-react';
import { useState } from 'react';

function Hero({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="relative bg-emerald-600 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-[3rem] shadow-xl">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-4xl mx-auto text-center space-y-8">
                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                    Discover Your Next <br />
                    <span className="text-emerald-200">Favorite Meal</span>
                </h1>
                <p className="text-emerald-50 text-lg md:text-xl max-w-2xl mx-auto">
                    Explore thousands of recipes with detailed instructions, nutrition info, and chef's tips.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto relative">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="What are you craving today?"
                            className="w-full pl-6 pr-32 py-4 rounded-full bg-white text-gray-800 shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400/50 text-lg placeholder:text-gray-400"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 rounded-full font-bold hover:shadow-lg hover:scale-105 transition active:scale-95 cursor-pointer flex items-center gap-2"
                        >
                            <Search className="w-5 h-5" />
                            Search
                        </button>
                    </div>
                </div>

                {/* Popular tags/Categories preview can go here later */}
            </div>
        </div>
    );
}

export default Hero;
