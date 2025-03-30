import React from 'react';

const CoinItem = ({ coin, toggleFavorite }) => {
    const priceChange = !isNaN(coin.changePercent24Hr) && coin.changePercent24Hr !== null
        ? `${Number(coin.changePercent24Hr).toFixed(2)}%`
        : 'No data';

    const isFavorite = coin.favorite ? '' : '+';

    return (
        <div className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2">{coin.name} ({coin.symbol})</h3>
            <p className="text-lg text-gray-400">Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
            <p className="text-lg text-gray-400">Change (24h): {priceChange}</p>
            <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none"
                onClick={() => toggleFavorite(coin)}
            >
                {isFavorite} {isFavorite === '+' ? 'Add to Favorites' : 'Remove from Favorites'}
            </button>
        </div>
    );
};

export default CoinItem;
