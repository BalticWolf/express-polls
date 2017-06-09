const express = require('express');
const polls = require('../models/polls');
const router = express.Router();

router.get('/:id', (req, res) =>{
    const id = parseInt(req.params.id, 10);
    const poll = users.find(u => u.id === id);

    if(!poll) return res.status(404).send('User not found');
    res.send(poll);
});

module.exports = router;
