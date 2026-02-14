import { Link } from '@tanstack/react-router';
import { UtensilsCrossed, Heart } from 'lucide-react';

function Navbar() {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-emerald-100 p-2 rounded-full group-hover:bg-emerald-200 transition">
                            <UtensilsCrossed className="w-6 h-6 text-emerald-600" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800 tracking-tight">
                            Recip<span className="text-emerald-600">edia</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-emerald-600 font-medium transition [&.active]:text-emerald-600"
                        >
                            Home
                        </Link>
                        <Link
                            to="/pantry"
                            className="text-gray-600 hover:text-emerald-600 font-medium transition [&.active]:text-emerald-600 flex items-center gap-1"
                        >
                            <span>Pantry Chef</span>
                        </Link>
                        <Link
                            to="/shopping-list"
                            className="text-gray-600 hover:text-emerald-600 font-medium transition [&.active]:text-emerald-600 flex items-center gap-1"
                        >
                            <span>Shopping List</span>
                        </Link>
                        <Link
                            to="/favorites"
                            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium transition [&.active]:text-orange-500 group"
                        >
                            <Heart className="w-5 h-5 group-hover:fill-orange-500 transition-colors" />
                            <span>Favorites</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
