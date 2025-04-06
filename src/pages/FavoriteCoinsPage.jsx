import React, { useState, useEffect } from 'react';
import CoinItem from '../components/CoinItem';

const FavoriteCoinsPage = () => {
    const [favorites, setFavorites] = useState([]);

    // Haal favorieten op uit localStorage
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    // Verwijder een coin uit de favorieten
    const toggleFavorite = (coin) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== coin.id); // Verwijder de coin
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Werk localStorage bij
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold">Your Favorite Coins</h2>

            {/* Weergeven van favorieten */}
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(coin => (
                        <CoinItem
                            key={coin.id}
                            coin={coin}
                            toggleFavorite={toggleFavorite} // Geef toggleFavorite door aan CoinItem
                            favorites={favorites} // Geef favorieten door aan CoinItem
                        />
                    ))}
                </div>
            ) : (
                <p>No favorite coins yet.</p>
            )}
        </div>
    );
};

export default FavoriteCoinsPage;
