import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoinList from '../components/CoinList';

const CoinListPage = () => {
    const [coins, setCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await axios.get('https://data-api.coindesk.com/asset/v1/top/list', {
                    params: { page: 1, page_size: 100 }
                });
                setCoins(response.data.Data.LIST);
            } catch (error) {
                console.error('Error fetching CoinDesk data:', error);
            }
        };

        fetchCoins();
    }, []);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (coin) => {
        setFavorites(prevFavorites => {
            if (prevFavorites.some(fav => fav.ID === coin.ID)) {
                return prevFavorites.filter(fav => fav.ID !== coin.ID);
            } else {
                return [...prevFavorites, coin];
            }
        });
    };

    const filteredCoins = coins.filter(coin =>
        coin.NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.SYMBOL.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold">All Coins</h2>

            {/* Zoekveld */}
            <div className="relative mt-4">
                <input
                    type="text"
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg w-72"
                    placeholder="Search by name or symbol"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Show filtered coins or message */}
            {filteredCoins.length > 0 ? (
                <CoinList
                    coins={filteredCoins}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                />
            ) : (
                <p>No coins available</p>
            )}
        </div>
    );
};

export default CoinListPage;
