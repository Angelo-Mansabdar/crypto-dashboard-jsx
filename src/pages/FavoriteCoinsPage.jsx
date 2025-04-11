import React, { useState, useEffect } from 'react';
import CoinItem from '../components/CoinItem';

const FavoriteCoinsPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const toggleFavorite = (coin) => {
        const updatedFavorites = favorites.filter(fav => fav.ID !== coin.ID);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold">Your Favorite Coins</h2>

            {/* Weergeven van favorieten */}
            {(() => {
                if (favorites.length > 0) {
                    return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favorites.map(coin => (
                                <CoinItem
                                    key={coin.ID}
                                    coin={coin}
                                    toggleFavorite={toggleFavorite}
                                    favorites={favorites}
                                />
                            ))}
                        </div>
                    );
                } else {
                    return <p>No favorite coins yet.</p>;
                }
            })()}
        </div>
    );

};

export default FavoriteCoinsPage;
