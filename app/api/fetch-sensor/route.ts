// app/api/fetch-sensor/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db/db';
import { sensorData } from '@/db/schema';

const ESP32_URL = 'http://localhost:8080/api/data';

export async function GET() {
    try {
        const espResponse = await fetch(ESP32_URL, { cache: 'no-store' });
        if (!espResponse.ok) throw new Error('ESP32 not reachable');

        const data = await espResponse.json();

        await db.insert(sensorData).values({
            temperature: data.temperature,
            humidity: data.humidity,
            airQualityRaw: data.airQualityRaw,
            heartRate: data.heartRate, // Added mapping
            spo2: data.spo2,           // Added mapping
        });

        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error("Sensor fetch error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
    }
}