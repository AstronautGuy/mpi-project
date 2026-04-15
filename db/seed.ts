// db/seed.ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { sensorData } from './schema';

const seed = () => {
    console.log('🌱 Starting local SQLite database seed...');

    const sqlite = new Database('sqlite.db');
    const db = drizzle(sqlite);

    const dummyData = [];
    const now = new Date();

    console.log('Generating 24 hours of historical data...');

    for (let i = 0; i < 24; i++) {
        const pastTime = new Date(now.getTime() - i * 60 * 60 * 1000);

        dummyData.push({
            temperature: parseFloat((22 + Math.random() * 5).toFixed(2)),
            humidity: parseFloat((45 + Math.random() * 15).toFixed(2)),
            airQualityRaw: Math.floor(350 + Math.random() * 150),
            heartRate: Math.floor(65 + Math.random() * 25), // 65 to 90 bpm
            spo2: Math.floor(95 + Math.random() * 5),       // 95% to 99%
            timestamp: pastTime.toISOString(),
        });
    }

    try {
        db.insert(sensorData).values(dummyData).run();
        console.log(`✅ Successfully inserted ${dummyData.length} records into sqlite.db!`);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    }
};

seed();