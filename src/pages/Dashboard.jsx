import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CoinList from '../components/CoinList'; // CoinList component

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const topCoins = coins.slice(0, 10); // Top 10 coins
    const chartData = {
        labels: topCoins.map(coin => coin.name),
        datasets: [{
            data: topCoins.map(coin => parseFloat(coin.marketCapUsd)),
            backgroundColor: topCoins.map((_, index) => `rgba(${index * 25}, 100, 255, 0.5)`),
        }]
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold">Crypto Dashboard</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h3 className="text-2xl font-semibold">Top 10 Coins Market Share</h3>
                    <Doughnut data={chartData} />
                </>
            )}
        </div>
    );
};

export default Dashboard;
