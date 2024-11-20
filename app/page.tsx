'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [japaneseDate, setJapaneseDate] = useState<string>('');

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await fetch('/api/date');
        const data = await response.json();
        setJapaneseDate(data.date);
      } catch (error) {
        console.error('Failed to fetch date:', error);
      }
    };

    // Fetch immediately
    fetchDate();
    
    // Then fetch every second
    const interval = setInterval(fetchDate, 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <h1 className="text-4xl font-bold text-black">
        こんにちは
      </h1>
      <p className="text-2xl text-black">
        {japaneseDate}
      </p>
    </main>
  );
}
