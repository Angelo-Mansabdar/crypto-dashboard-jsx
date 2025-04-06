import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CoinListPage from './pages/CoinListPage';
import CatGifPage from './pages/CatGifPage';
import CoinDetailPage from './pages/CoinDetailPage';
import FavoriteCoinsPage from './pages/FavoriteCoinsPage'; // Voeg deze import toe
import './index.css';

const App = () => {
    return (
        <Router>
            <div className="bg-gray-900 min-h-screen text-white">
                <div className="flex">
                    {/* Side menu */}
                    <div className="w-64 bg-gray-800 p-5">
                        <h1 className="text-2xl font-bold mb-8">Crypto Dashboard</h1>
                        <ul>
                            <li className="text-lg py-2 hover:bg-gray-700 cursor-pointer">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="text-lg py-2 hover:bg-gray-700 cursor-pointer">
                                <Link to="/coinlist">Coin List</Link>
                            </li>
                            <li className="text-lg py-2 hover:bg-gray-700 cursor-pointer">
                                <Link to="/catgif">Gratis Ram Downloaden</Link>
                            </li>
                            <li className="text-lg py-2 hover:bg-gray-700 cursor-pointer">
                                <Link to="/favorites">Favorite Coins</Link> {/* Voeg link naar favorieten toe */}
                            </li>
                        </ul>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-6">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/coinlist" element={<CoinListPage />} />
                            <Route path="/catgif" element={<CatGifPage />} />
                            <Route path="/coin/:coinId" element={<CoinDetailPage />} />
                            <Route path="/favorites" element={<FavoriteCoinsPage />} /> {/* Voeg route voor favorieten toe */}
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
