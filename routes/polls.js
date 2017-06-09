const express = require('express');
const polls = require('../models/polls');
const router = express.Router();

// Récupération de la liste des sondages
router.get('/', (req, res) => {
    res.send(polls);
});

// Récupération d'un sondage selon son id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const poll = polls.find(u => u.id === id);

    if(!poll) return res.status(404).send('Poll not found');
    res.send(poll);
});

// Ajout d'un sondage
router.post('/', (req, res) => {
    const { question, answers } = req.body;

    if (!question) return res.status(400).send('Missing parameter question');
    if (!answers) return res.status(400).send('Missing parameter answers');

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

// Suppression d'un sondage par son id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const poll = polls.find(u => u.id === id);
    if(!poll) return res.sendStatus(404);

    const index = polls.findIndex(u => u.id === id);
    polls.splice(index, 1); // supprime un seul élément à partir de index

    res.status(204);
});

// Voter à un sondage (identifié par son id)
router.post('/:id/vote', (req, res) => {
    const answer = req.body.answer;
    const id = parseInt(req.params.id, 10);
    const poll = polls.find(u => u.id === id);
    if(!poll) return res.sendStatus(404);

    if (!answer) return res.status(400).send('Missing parameter answer');
    if(answer >= poll.answers.length) return res.status(400).send('Answer is not in the range');

    poll.votes.push(answer);
    res.status(201).send(poll);
});

module.exports = router;
