const settings = require('./settings');
const express = require('express');
const bodyParser = require('body-parser'); // ceci est un middleware qui formate la requete
const usersRoutes = require('./routes/users');
const pollsRoutes = require('./routes/polls');
const authMiddleware = require ('./authMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authMiddleware);

app.use('/users', usersRoutes);
app.use('/polls', pollsRoutes);

app.get('/', (req, res) =>{
    res.send('It works!');
});

app.listen(settings.port, () => {
    console.log('Listening on port ' + settings.port);
});
