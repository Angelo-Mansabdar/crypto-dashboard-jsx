import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CoinDetailPage = () => {
    const { coinId } = useParams(); // Get the coinId (symbol like BTC, ETH) from the URL
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the top assets from the CoinDesk API (list of coins)
        axios.get(`https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100`)
            .then(response => {
                // Look for the coin in the list by matching the SYMBOL (e.g., BTC, ETH)
                const coinData = response.data?.Data?.LIST.find(coin => coin.SYMBOL.toLowerCase() === coinId.toLowerCase());

                if (coinData) {
                    setCoin(coinData);  // Update state with the coin's metadata
                } else {
                    console.error('Coin not found in the response');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching coin details:', error);
                setLoading(false);
            });
    }, [coinId]);  // Dependency array ensures the effect runs again when coinId changes

    if (loading) {
        return <p>Loading...</p>;
    }

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
