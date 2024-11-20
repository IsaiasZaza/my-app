"use client"
import { useEffect, useState } from 'react';

const GiftList = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await fetch('https://end-three.vercel.app/api/gifts');
        if (!response.ok) {
          throw new Error('Failed to fetch gifts');
        }
        const data = await response.json();
        setGifts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Presentes</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gifts.map((gift, index) => (
          <li
            key={index}
            className="p-4 border rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src={gift.image}
              alt={gift.nome}
              className="w-full h-40 object-cover rounded"
            />
            <div className="mt-2">
              <h2 className="text-lg font-semibold">{gift.name}</h2>
              <p className="text-gray-600">Quantidade: {gift.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GiftList;
