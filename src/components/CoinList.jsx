import React from 'react';
import CoinItem from './CoinItem'; // Zorg ervoor dat de CoinItem goed geïmporteerd is

const CoinList = ({ coins, toggleFavorite, favorites }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coins.length > 0 ? (
                coins.map(coin => (
                    <CoinItem
                        key={coin.id}
                        coin={coin}
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                    />
                ))
            ) : (
                <p>No coins available</p>
            )}
        </div>
    );
};

export default CoinList;
