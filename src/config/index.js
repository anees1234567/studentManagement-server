const dotenv=require("dotenv")
dotenv.config()
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const DB_URL = process.env.databaseUrl || 'database_url';
const HOST = process.env.HOST || 'localhost'
const SECRET_KEY =process.env.TokenKey




module.exports={PORT,DB_URL,HOST,SECRET_KEY}

