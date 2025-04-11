import React from 'react';
import { Link } from 'react-router-dom';

const CoinItem = ({ coin, toggleFavorite, favorites }) => {
    const isFavorite = favorites.some(fav => fav.ID === coin.ID);
    const priceChange = parseFloat(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD || 0).toFixed(2);

    return (
        <div className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold">
                <Link to={`/coin/${coin.SYMBOL}`}>{coin.NAME}</Link>
            </h3>
            <p>Price: ${parseFloat(coin.PRICE_USD || 0).toFixed(2)}</p>
            <p className={priceChange < 0 ? 'text-red-500' : 'text-green-500'}>
                {priceChange}% (24h)
            </p>
            <button
                className={`mt-4 py-2 px-4 rounded-lg ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                onClick={() => toggleFavorite(coin)}
            >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default CoinItem;
