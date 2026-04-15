// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./db/schema.ts",
    dbCredentials: {
        url: "sqlite.db", // This is the local file we created earlier
    },
});