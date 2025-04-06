import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CoinDetailPage = () => {
    const { coinId } = useParams();  // Haal het coinId uit de URL
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Haal de gegevens van de geselecteerde coin op
        axios.get(`https://api.coincap.io/v2/assets/${coinId}`)
            .then(response => {
                setCoin(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching coin details:', error);
                setLoading(false);
            });
    }, [coinId]);

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
                <h3 className="text-2xl font-bold">{coin.name} ({coin.symbol})</h3>
                <p><strong>Price: </strong>${parseFloat(coin.priceUsd).toFixed(2)}</p>
                <p><strong>Market Cap: </strong>${parseFloat(coin.marketCapUsd).toFixed(0)}</p>
                <p><strong>24h Change: </strong>
                    <span className={parseFloat(coin.changePercent24Hr) < 0 ? 'text-red-500' : 'text-green-500'}>
                        {parseFloat(coin.changePercent24Hr).toFixed(2)}%
                    </span>
                </p>
                <p><strong>Supply: </strong>{parseFloat(coin.supply).toFixed(0)}</p>
                <p><strong>Volume (24h): </strong>${parseFloat(coin.volumeUsd24Hr).toFixed(0)}</p>
            </div>
        </div>
    );
};

export default CoinDetailPage;
