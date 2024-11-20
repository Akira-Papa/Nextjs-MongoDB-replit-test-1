'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [japaneseDate, setJapaneseDate] = useState<string>('');

  useEffect(() => {
    const fetchDate = async () => {
      try {
        console.log('Attempting to fetch date...');
        const response = await fetch('/api/date');
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Received data:', data);
        setJapaneseDate(data.date);
      } catch (error) {
        console.error('Failed to fetch date:', error);
      }
    };

    fetchDate();
  }, []);

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
