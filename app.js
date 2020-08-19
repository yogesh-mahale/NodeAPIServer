const express 		= require('express');
const bodyParser 	= require('body-parser');
// const passport      = require('passport');
// const pe            = require('parse-error');
const cors          = require('cors');

const { Sequelize } = require('sequelize');

//Database
const db = require('./config/database');

//Test DB
db.authenticate()
    .then(() => console.log('Database Connected...'))
    .catch(err => console.log('Error:', err));


//const v1    = require('./routes/v1');
const app   = express();

// CORS
app.use(cors());

app.get('/', (req, res) => res.send('INDEX'));

//body-parser
// request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ extended: false, limit: '10mb' }));

//Middlewares
app.get('/', (req, res) => res.send('INDEX'));
app.use('/', require('./routes/user.route'));




const PORT = 5000;

app.listen(PORT, console.log('Server started on port'+ PORT));

