import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [coins, setCoins] = useState([]);

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
            {/* Directly render the chart once data is available */}
            {topCoins.length > 0 ? (
                <>
                    <h3 className="text-2xl font-semibold">Top 10 Coins Market Share</h3>
                    <div className="w-200 h-200">
                        <Doughnut data={chartData} />
                    </div>
                </>
            ) : (
                <p>No data available</p>  // Fallback message if no coins are available
            )}
        </div>
    );
};

export default Dashboard;
