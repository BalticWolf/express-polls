const express = require('express');
const users = require('../models/users');
const router = express.Router();


router.get('/', (req, res) =>{
    const sex = req.query.sex;
    if (sex && !['M', 'F'].includes(sex)) return res.status(400).send("Parameter sex must be 'M' or 'F'");
    const filteredUser = sex
        ? users.filter(u => u.sex === sex)
        : users;
    res.send(filteredUser);
});

router.get('/:id', (req, res) =>{
    const id = parseInt(req.params.id, 10); // enregistrement de :id qui se trouve dans la route
    const user = users.find(u => u.id === id); // trouve l'utilisateur portant l'id :id

    if(!user) return res.status(404).send('User not found');
    res.send(user);
});

// Ajout d'un utilisateur
router.post('/', (req, res) => {
    const { username, sex } = req.body;

    if (!username) return res.status(400).send('Missing parameter username');
    if (!sex) return res.status(400).send('Missing parameter sex');

    const maxId = users.reduce((max, u) => max > u.id ? max : u.id, 0);
    // const maxId = Math.max(...users.map(u => u.id)); // alternative

    const user = {
        id: maxId + 1,
        username: username,
        sex: sex
    };

    users.push(user);
    res.status(201).send(user);
});

// Modification d'un utilisateur
router.put('/:id', (req, res) =>{
    const { username, sex } = req.body;
    if (!username && !sex) return res.status(400).send('Missing parameters');

    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);
    if(!user) return res.sendStatus(404);

    if (sex && !['M', 'F'].includes(sex)) return res.status(400).send("Parameter sex must be 'M' or 'F'");

    user.username = username ? username : user.username;
    user.sex = sex ? sex : user.sex;

    res.send(user);
});

// Suppression d'un utilisateur
router.delete('/:id', (req, res) =>{
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);
    if(!user) return res.sendStatus(404);

    const index = users.findIndex(u => u.id === id);
    users.splice(index, 1); // supprime un seul élément à partir de index

    res.status(204);
});

module.exports = router;