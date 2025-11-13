import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const port = process.env.PORT || 3004;
app.listen(port, () => {
	console.log(`[avaliacao] running on port ${port} (${process.env.NODE_ENV || 'production'})`);
});
