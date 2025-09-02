
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import snippetRoutes from './routes/snippetRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 3000 ;


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/snippets', snippetRoutes);
app.use('/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
