const express = require('express');
const connectDB = require('./db');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');

app.set('views', path.join(process.cwd(), 'views'))

app.use(express.static('static'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

app.use('/weather', weatherRoutes);

app.get('/', (req, res) => {
  res.render('home', req.query);
});

app.get('/login', (req, res) => {
  res.render('login', req.query);
});

app.get('/register', (req, res) => {
  res.render('register', req.query);
});

app.get('/weather', (req, res) => {
  res.render('weather', req.query);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});