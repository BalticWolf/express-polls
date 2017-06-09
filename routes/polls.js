const express = require('express');
const router = express.Router();
const authMiddleware = require ('../authMiddleware');
const polls = require('../models/polls');

router.param('id', (req, res, next, id) => {
    const pollId = parseInt(id, 10);
    const poll = polls.getById(pollId);

    if(!poll) return res.sendStatus(404);

    req.poll = poll;

    next();
});


router.get('/', (req, res) => {
    res.send(polls.getAll());
});

router.get('/:id', (req, res) => {
    res.send(req.poll);
});

router.post('/', authMiddleware, (req, res) => {
    const { question, answers } = req.body;

    if (typeof question !== 'string') {
        return res.status(400).send('Wrong parameter question');
    }
    if (!Array.isArray(answers) || answers.some(a => typeof a !== 'string') || answers.length < 2) {
        return res.status(400).send('Wrong parameter answers');
    }

    const poll = polls.create(question, answers);

    res.status(201).send(poll);
});

router.delete('/:id', authMiddleware, (req, res) => {
    polls.drop(req.poll.id);

    res.status(204);
});


router.post('/:id/vote', (req, res) => {
    const vote = parseInt(req.body.answer, 10);

    if (typeof answer === 'undefined') return res.status(400).send('Missing parameter answer');
    if(!(vote in req.poll.answers)) { // check if the index answer is in answers
        return res.status(400).send('Answer is not in the range');
    }

    polls.vote(req.poll.id, vote);

    res.status(201).send(req.poll.votes);
});

module.exports = router;
