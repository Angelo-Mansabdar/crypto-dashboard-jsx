import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CoinDetailPage = () => {
    const { coinId } = useParams(); // Get the coinId (symbol like BTC, ETH) from the URL
    const [coin, setCoin] = useState(null);

    useEffect(() => {
        const fetchCoinDetails = async () => {
            try {
                const response = await axios.get(`https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100`);
                const coinData = response.data?.Data?.LIST.find(coin => coin.SYMBOL.toLowerCase() === coinId.toLowerCase());

                if (coinData) {
                    setCoin(coinData);
                } else {
                    console.error('Coin not found in the response');
                }
            } catch (error) {
                console.error('Error fetching coin details:', error);
            }
        };
        fetchCoinDetails();
    }, [coinId]);

    if (!coin) {
        return <p>Coin not found!</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold">Coin Details</h2>
            <div className="mt-4 bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold">{coin.NAME} ({coin.SYMBOL})</h3>
                <p><strong>Description: </strong>{coin.ASSET_DESCRIPTION_SNIPPET || 'No description available'}</p>
                <p><strong>Price: </strong>${parseFloat(coin.PRICE_USD || 0).toFixed(2)}</p>
                <p><strong>Market Cap: </strong>${parseFloat(coin.CIRCULATING_MKT_CAP_USD || 0).toFixed(0)}</p>
                <p><strong>Supply: </strong>{parseFloat(coin.SUPPLY_CIRCULATING || 0).toFixed(0)}</p>
                <p><strong>Volume (24h): </strong>${parseFloat(coin.SPOT_MOVING_24_HOUR_QUOTE_VOLUME_USD || 0).toFixed(0)}</p>
                <p><strong>Launch Date: </strong>{new Date(coin.LAUNCH_DATE * 1000).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default CoinDetailPage;
