import express from 'express'
import dotenv from 'dotenv';
import cors from "cors"
import bodyParser from "body-parser";

import UserRouter from './Routs/UserRouter.js'
import LinkRouter from './Routs/LinkRouter.js';
import connectDB from './database.js'
// import LinkController from './Conttrollers/LinkController.js';
// import LinkModel from './Models/LinkModel.js';

connectDB();
const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', UserRouter);
app.use('/links', LinkRouter);
app.use(cors());
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.text());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})