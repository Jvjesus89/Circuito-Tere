import pg from 'pg';

const {
	PGHOST = 'localhost',
	PGPORT = '5432',
	PGDATABASE = 'circuito-tere',
	PGUSER = 'postgres',
	PGPASSWORD = '123456'
} = process.env;

export const pool = new pg.Pool({
	host: PGHOST,
	port: Number(PGPORT),
	database: PGDATABASE,
	user: PGUSER,
	password: PGPASSWORD,
	max: 10,
	idleTimeoutMillis: 30_000,
	connectionTimeoutMillis: 10_000
});

export async function checkConnection() {
	const client = await pool.connect();
	try {
		await client.query('SELECT 1');
	} finally {
		client.release();
	}
}


