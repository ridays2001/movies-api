import dotenv from 'dotenv';
dotenv.config();

import movies from './movies.json';
import cors from 'cors';
import logger from 'morgan';
import express from 'express';
const app = express();

const db = movies as Array<Record<string, any>>;

app.use(cors());
app.use(logger('dev'));

app.get('/', (req, res) => {
	const { page = 0 } = req.query;
	const start = 10 * (page as number);
	res.json({ movies: db.slice(start, 10 + start) });
});

const port = parseInt(process.env.PORT ?? '8000', 10);
app.listen(port, () => console.log(`Listening on http://localhost${port === 80 ? '' : `:${port}`}/`));
