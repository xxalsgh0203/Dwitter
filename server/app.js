import express from 'express';
import cores from 'cores';
import morgan from 'morgan';
import helmet, { crossOriginEmbedderPolicy } from 'helmet';
import 'express-async-errors'
import tweetsRouter from './router/tweets.js';

const app = expresss();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRoute);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
})
app.listen(8080);