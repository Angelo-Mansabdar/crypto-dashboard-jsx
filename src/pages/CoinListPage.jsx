import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoinList from '../components/CoinList';

const CoinListPage = () => {
    const [coins, setCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    // Haal de coins op van de API
    useEffect(() => {
        axios.get('https://api.coincap.io/v2/assets')
            .then(response => {
                setCoins(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    // Haal favorieten op uit localStorage
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    // Sla favorieten op in localStorage wanneer ze veranderen
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Filter coins op basis van de zoekterm
    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Voeg of verwijder een coin uit de favorieten
    const toggleFavorite = (coin) => {
        setFavorites(prevFavorites => {
            if (prevFavorites.some(fav => fav.id === coin.id)) {
                return prevFavorites.filter(fav => fav.id !== coin.id); // Verwijder coin uit favorieten
            } else {
                return [...prevFavorites, coin]; // Voeg coin toe aan favorieten
            }
        });
    };

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

            {/* Wacht totdat de data geladen is */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <CoinList
                    coins={filteredCoins}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                />
            )}
        </div>
    );
};

export default CoinListPage;
