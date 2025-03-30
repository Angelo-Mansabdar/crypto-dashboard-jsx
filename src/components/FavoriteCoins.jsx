import React from 'react';

const FavoriteCoins = ({ favorites, toggleFavorite }) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Favorite Coins</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.length === 0 ? (
                    <p className="text-gray-500">No favorite coins yet.</p>
                ) : (
                    favorites.map(coin => (
                        <div key={coin.id} className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold">{coin.name} ({coin.symbol})</h3>
                            <button
                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none"
                                onClick={() => toggleFavorite(coin)}
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FavoriteCoins;
