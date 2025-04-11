import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CoinDetailPage = () => {
    const { coinId } = useParams();  // Extract coinId from the URL
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the list of assets from CoinDesk
        axios.get('https://data-api.coindesk.com/asset/v1/top/list')
            .then(response => {
                console.log('API Response:', response.data);  // Log the full API response

                const coinsList = response.data?.Data?.LIST;
                if (coinsList) {
                    // Log the list to check if it contains the coin data
                    console.log('Coins List:', coinsList);

                    // Find the coin from the list based on the coinId (SYMBOL)
                    const coinData = coinsList.find(coin => coin.SYMBOL.toLowerCase() === coinId.toLowerCase());
                    if (coinData) {
                        setCoin(coinData);  // Set the coin data in state
                    } else {
                        console.error('Coin not found in the response');
                    }
                }
                setLoading(false);  // End loading state
            })
            .catch(error => {
                console.error('Error fetching coin details:', error);
                setLoading(false);  // End loading state on error
            });
    }, [coinId]);  // Re-run the effect if coinId changes


    if (loading) {
        return <p>Loading...</p>;  // Show loading text
    }

    if (!coin) {
        return <p>Coin not found!</p>;  // Show message if the coin data is not found
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold">Coin Details</h2>
            <div className="mt-4 bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold">{coin.NAME} ({coin.SYMBOL})</h3>
                <img src={coin.LOGO_URL} alt={coin.NAME} className="w-16 h-16 mb-4" />
                <p><strong>Price: </strong>${parseFloat(coin.PRICE_USD).toFixed(2)}</p>
                <p><strong>Market Cap: </strong>${parseFloat(coin.CIRCULATING_MKT_CAP_USD).toFixed(0)}</p>
                <p><strong>24h Change: </strong>
                    <span className={parseFloat(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD) < 0 ? 'text-red-500' : 'text-green-500'}>
                        {parseFloat(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD).toFixed(2)}%
                    </span>
                </p>
                <p><strong>Supply: </strong>{parseFloat(coin.SUPPLY_CIRCULATING).toFixed(0)}</p>
                <p><strong>Volume (24h): </strong>${parseFloat(coin.SPOT_MOVING_24_HOUR_QUOTE_VOLUME_USD).toFixed(0)}</p>
            </div>
        </div>
    );
};

export default CoinDetailPage;
