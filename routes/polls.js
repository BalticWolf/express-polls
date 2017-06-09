const express = require('express');
const router = express.Router();
const authMiddleware = require ('../authMiddleware');
const polls = require('../models/polls');

router.param('id', (req, res, next, id) => {
    const pollId = parseInt(id, 10);
    const poll = polls.find(p => p.id === pollId);

    if(!poll) return res.sendStatus(404);

    req.poll = poll;

    next();
});

// Retrieval of polls list
router.get('/', (req, res) => {
    res.send(polls);
});

// Retrieval of a specific poll by its id
router.get('/:id', (req, res) => {
    res.send(req.poll);
});

// Creation of a new poll
router.post('/', authMiddleware, (req, res) => {
    const { question, answers } = req.body;

    if (typeof question !== 'string') {
        return res.status(400).send('Wrong parameter question');
    }
    if (!Array.isArray(answers) || answers.some(a => typeof a !== 'string') || answers.length < 2) {
        return res.status(400).send('Wrong parameter answers');
    }

    const maxId = Math.max(...polls.map(p => p.id));

    const poll = {
         id: maxId + 1,
         question: question,
         answers: answers,
         votes: []
    };

    polls.push(poll);
    res.status(201).send(poll);
});

// Poll deletion by its id
router.delete('/:id', authMiddleware, (req, res) => {
    const index = polls.findIndex(p => p.id === req.poll.id);
    polls.splice(index, 1); // delete one single element from polls based on its index

    res.status(204);
});

// Vote to a poll (by its id)
router.post('/:id/vote', (req, res) => {
    const answer = parseInt(req.body.answer, 10);

    if (typeof answer === 'undefined') return res.status(400).send('Missing parameter answer');
    if(!(answer in req.poll.answers)) { // check if the index answer is in answers
        return res.status(400).send('Answer is not in the range');
    }

    req.poll.votes.push(answer);
    res.status(201).send(req.poll.votes);
});

module.exports = router;
