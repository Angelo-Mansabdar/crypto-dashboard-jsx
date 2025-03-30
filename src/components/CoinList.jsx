import React from 'react';
import CoinItem from './CoinItem';

const CoinList = ({ coins, toggleFavorite }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coins.map(coin => (
                <CoinItem key={coin.id} coin={coin} toggleFavorite={toggleFavorite} />
            ))}
        </div>
    );
};

export default CoinList;
