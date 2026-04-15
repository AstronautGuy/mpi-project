// db/schema.ts
import { sqliteTable, integer, real, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const sensorData = sqliteTable('sensor_data', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    temperature: real('temperature').notNull(),
    humidity: real('humidity').notNull(),
    airQualityRaw: integer('air_quality_raw').notNull(),
    heartRate: integer('heart_rate').notNull(), // New field
    spo2: integer('spo2').notNull(),            // New field
    timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull(),
});