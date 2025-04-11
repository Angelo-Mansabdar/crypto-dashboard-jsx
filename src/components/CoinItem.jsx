import React from 'react';
import { Link } from 'react-router-dom';

const CoinItem = ({ coin, toggleFavorite, favorites }) => {
    const isFavorite = favorites.some(fav => fav.ID === coin.ID);
    const priceChange = parseFloat(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD || 0).toFixed(2);

    const getButtonProps = (isFavorite) => {
        if (isFavorite) {
            return {
                text: 'Remove from Favorites',
                className: 'bg-red-500',
            };
        } else {
            return {
                text: 'Add to Favorites',
                className: 'bg-blue-500',
            };
        }
    };

    const getPriceChangeProps = (priceChange) => {
        let textColor;
        let displayText;

        if (priceChange < 0) {
            textColor = 'text-red-500';
            displayText = `${priceChange}% (24h)`;
        } else {
            textColor = 'text-green-500';
            displayText = `${priceChange}% (24h)`;
        }

        return { textColor, displayText };
    };

    return (
        <div className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold">
                <Link to={`/coin/${coin.SYMBOL}`}>{coin.NAME}</Link>
            </h3>
            <p>Price: ${parseFloat(coin.PRICE_USD || 0).toFixed(2)}</p>
            <p className={getPriceChangeProps(priceChange).textColor}>
                {getPriceChangeProps(priceChange).displayText}
            </p>
            <button
                className={`mt-4 py-2 px-4 rounded-lg ${getButtonProps(isFavorite).className} text-white`}
                onClick={() => toggleFavorite(coin)}
            >
                {getButtonProps(isFavorite).text}
            </button>
        </div>
    );
};

export default CoinItem;
