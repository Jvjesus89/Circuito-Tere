import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const port = process.env.PORT || 3003;

app.listen(port, () => {
	console.log(`[eventos-service] running on port ${port} (${process.env.NODE_ENV || 'production'})`);
});
