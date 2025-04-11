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
        const fetchCoins = async () => {
            try {
                const response = await axios.get('https://data-api.coindesk.com/asset/v1/top/list', {
                    params: { page: 1, page_size: 100 }
                });

                const coinData = response.data?.Data?.LIST || [];
                setCoins(coinData);
            } catch (error) {
                console.error('Error fetching CoinDesk data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoins();
    }, []);


    const topCoins = coins.slice(0, 10);

    const chartData = {
        labels: topCoins.map(coin => coin.NAME),
        datasets: [{
            data: topCoins.map(coin => coin.CIRCULATING_MKT_CAP_USD),
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
