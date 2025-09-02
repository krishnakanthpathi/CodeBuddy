
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db.js';

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 3000 ;


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT NOW() AS time');
        res.json({ solution: rows[0].time });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": 'Database query failed' , "details": error.message});
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
