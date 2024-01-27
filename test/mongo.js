import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const username = 'root';
const password = 'password';
const host = 'localhost:27017';
const dbName = 'financial_data';

const connectionString = `mongodb://${host}/${dbName}?retryWrites=true&w=majority`;
console.log(connectionString);

await mongoose.connect(connectionString);