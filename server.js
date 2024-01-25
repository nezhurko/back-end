import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const PORT = process.env.API_PORT;

app.on('error', (err) => {
  console.error(`Server error: ${err.message}`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});