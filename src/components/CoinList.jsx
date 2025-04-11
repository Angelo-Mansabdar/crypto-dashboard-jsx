import React from 'react';
import CoinItem from './CoinItem';

const CoinList = ({ coins, toggleFavorite, favorites }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
                if (coins.length > 0) {
                    return coins.map(coin => (
                        <CoinItem
                            key={coin.ID}
                            coin={coin}
                            toggleFavorite={toggleFavorite}
                            favorites={favorites}
                        />
                    ));
                } else {
                    return <p>No coins available</p>;
                }
            })()}
        </div>
    );

};

export default CoinList;
