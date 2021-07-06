import express from 'express';
import 'express-async-errors';

let tweets = [
    {
        id: '1',
        text: '김민호 화이팅!',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url: '',
    },
    {
        id: '2',
        text: '휴스턴 화이팅!',
        createdAt: Date.now().toString(),
        name: 'Minho',
        username: 'Minho',
        url: '',
    }
];

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username ? tweets.filter(t => t.username === username)
    : tweets;
    res.status(200).json(data);
});

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find((t) => t.id === id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`});
    }
});

// POST / tweets
router.post('/', (res, req, next) => {
    const {text, name, username} = req.body;
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username,
    };
    tweets = [tweet, ...tweets];
    res.status(201).json(tweet);
});

// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
    const id = req.paramms.id;
    const text = req.body.text;
    const tweet = tweets.find((t) => t.id === id);
    if(tweet){
        tweet.text = text;
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`});
    }
});

// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter(t => t.id !== id);
    res.sendStatus(204);
});

export default router;