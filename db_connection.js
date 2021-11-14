// Tuto ici : https://expressjs.com/en/starter/hello-world.html 
//            https://www.w3schools.com/nodejs/nodejs_mysql.asp

var express = require('express')
var app = express()

var mysql = require('mysql')
var con = mysql.createConnection({
  host: 'localhost',
  user: 'fabino',
  password: 'MonopolI',
  database: 'movies',
})

con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

var cors = require('cors')
app.use(
  cors({
    origin: "*",
  })
);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

// get 20 first movies
app.get('/api/movies', function (req, res) {
  con.query(
    'SELECT * FROM movies LIMIT 20;',
    function (err, result) {
      if (err) throw err
      res.send(result);
      
    }
  )
})

// get all movies for search in
app.get('/api/allmovies', function (req, res) {
  con.query('SELECT * FROM movies;', function (err, result) {
    if (err) throw err
    res.send(result)
  })
})


app.get('/api/genres', function (req, res) {
  con.query(
    'SELECT * FROM genres;',
    function (err, result) {
      if (err) throw err
      res.send(result);
    }
  )
})

app.get('/api/producers', function (req, res) {
  con.query(
    'SELECT id,name FROM producers;',
    function (err, result) {
      if (err) throw err
      res.send(result);
    }
  )
})

app.get('/api/movies/:id', function (req, res) {
  con.query("SELECT * FROM movies WHERE id =" + req.params['id'], function (err, result) {
      if (err) throw err;
      res.send(result);
  });
})

app.get('/api/movies/:id/genres', function (req, res) {
  con.query("SELECT name FROM genres WHERE id IN (SELECT genre_id FROM movies WHERE id = " + req.params['id'] + " );", function (err, result) {
      if (err) throw err;
      res.send(result);
  });
})

app.get('/api/movies/:id/producers', function (req, res) {
  con.query("SELECT name FROM producers WHERE id IN (SELECT producer_id FROM movies WHERE id = " + req.params['id'] + " );", function (err, result) {
      if (err) throw err;
      res.send(result);
  });
})

app.listen(8000, () => {
    console.log("Serveur à l'écoute")
})
