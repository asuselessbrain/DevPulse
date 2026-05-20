import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(process.cwd(), ".env")});

export const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL || "",
  saltRounds: process.env.SALTROUNDS ? parseInt(process.env.SALTROUNDS) : 10
};