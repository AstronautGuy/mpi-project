// app/page.tsx
'use client';
import { useEffect, useState } from 'react';

type SensorData = {
    temperature: number;
    humidity: number;
    airQualityRaw: number;
    heartRate: number;
    spo2: number;
};

export default function Dashboard() {
    const [data, setData] = useState<SensorData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/fetch-sensor');
                const json = await res.json();

                if (json.success) {
                    setData(json.data);
                    setError(null);
                } else {
                    setError("Waiting for ESP32...");
                }
            } catch (err) {
                setError("Connection lost.");
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-neutral-950 p-8 text-neutral-100 font-sans">
            <div className="max-w-5xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-emerald-400 tracking-tight">Environment & Health Monitor</h1>
                    <p className="text-neutral-400 mt-2">Live College Demo Node</p>
                </header>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-8">
                        {error}
                    </div>
                )}

                {/* Changed grid-cols-3 to grid-cols-2 lg:grid-cols-5 for better layout with 5 items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center h-48">
                        <h2 className="text-neutral-400 text-sm font-semibold uppercase tracking-wider mb-2">Temp</h2>
                        <div className="text-4xl font-bold text-white">
                            {data ? `${data.temperature}°C` : '--'}
                        </div>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center h-48">
                        <h2 className="text-neutral-400 text-sm font-semibold uppercase tracking-wider mb-2">Humidity</h2>
                        <div className="text-4xl font-bold text-blue-400">
                            {data ? `${data.humidity}%` : '--'}
                        </div>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center h-48">
                        <h2 className="text-neutral-400 text-sm font-semibold uppercase tracking-wider mb-2">Air Qual</h2>
                        <div className="text-4xl font-bold text-amber-400">
                            {data ? data.airQualityRaw : '--'}
                        </div>
                    </div>

                    {/* New Heart Rate Card */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center h-48">
                        <h2 className="text-neutral-400 text-sm font-semibold uppercase tracking-wider mb-2">Heart Rate</h2>
                        <div className="text-4xl font-bold text-red-500">
                            {data ? `${data.heartRate} bpm` : '--'}
                        </div>
                    </div>

                    {/* New SpO2 Card */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center h-48">
                        <h2 className="text-neutral-400 text-sm font-semibold uppercase tracking-wider mb-2">SpO2</h2>
                        <div className="text-4xl font-bold text-cyan-400">
                            {data ? `${data.spo2}%` : '--'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}