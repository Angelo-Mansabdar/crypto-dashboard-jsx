import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoinList from './components/CoinList';
import FavoriteCoins from './components/FavoriteCoins';
import CatGif from './components/memes/CatGif.jsx';
import './index.css';

const App = () => {
    const [coins, setCoins] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [showCatGif, setShowCatGif] = useState(false);

    useEffect(() => {
        axios.get('https://api.coincap.io/v2/assets')
            .then(response => {
                setCoins(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const toggleFavorite = (coin) => {
        setFavorites(prevFavorites => {
            if (prevFavorites.includes(coin)) {
                return prevFavorites.filter(fav => fav.id !== coin.id);
            } else {
                return [...prevFavorites, coin];
            }
        });
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClick = () => {
        setShowCatGif(true);
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="flex">
                <div className="w-64 bg-gray-800 p-5">
                    <h1 className="text-2xl font-bold mb-8">Crypto Dashboard</h1>
                    <ul>
                        <li className="text-lg py-2 hover:bg-gray-700 cursor-pointer">Dashboard</li>
                        <li
                            className="text-lg py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={handleClick}
                        >
                            Gratis ram downloaden
                        </li>
                    </ul>
                </div>

                <div className="flex-1 p-6">
                    <header className="mb-6 flex justify-between items-center">
                        <h2 className="text-3xl font-semibold">All Coins</h2>

                        <div className="relative">
                            <input
                                type="text"
                                className="bg-gray-700 text-white px-4 py-2 rounded-lg w-72"
                                placeholder="Search by name or symbol"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </header>

                    {showCatGif && <CatGif />}

                    <FavoriteCoins favorites={favorites} toggleFavorite={toggleFavorite} />

                    <CoinList
                        coins={filteredCoins.slice((page - 1) * 20, page * 20)} // Paginate filtered coins
                        toggleFavorite={toggleFavorite}
                    />

                    <div className="flex justify-center items-center mt-4 space-x-4">
                        <button
                            className="bg-gray-700 p-2 rounded hover:bg-gray-600 disabled:opacity-50"
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span className="text-lg">Page {page}</span>
                        <button
                            className="bg-gray-700 p-2 rounded hover:bg-gray-600"
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
