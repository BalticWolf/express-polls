const settings = require('./settings');
const express = require('express');
const bodyParser = require('body-parser'); // this is a middleware to format server requests
const usersRoutes = require('./routes/users');
const pollsRoutes = require('./routes/polls');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRoutes);
app.use('/polls', pollsRoutes);

// Root route
app.get('/', (req, res) =>{
    res.send('It works!');
});

app.listen(settings.port, () => {
    console.log('Listening on port ' + settings.port);
});
