let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const Movie = require("../db").import("../models/movie");
const fetch = require("node-fetch");

// Endpoints
// GET:   http://localhost:3025/movie/:searchTerm
// POST:  http://localhost:3025/movie/review
// GET:   http://localhost:3025/movie/
// GET:   http://localhost:3025/movie/all
// PUT:   http://localhost:3025/movie/review/:id
// DEL:   http://localhost:3025/movie/review/:id

// -----  Movie Search  -----
// GET:  http://localhost:3025/movie/:searchTerm
router.get("/:searchTerm", (req, res) => {
  const apiKey = process.env.APIKEY;

  const headers = {
    "Content-Type": "application/json",
  };

  const searchTerm = req.params.searchTerm;

  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

  fetch(searchURL, {
    method: "GET",
    headers: headers,
  })
    .then((result) => result.json())
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Movie Create  -----
// POST:  http://localhost:3025/movie/review
router.post("/review", validateSession, (req, res) => {
  const movie = {
    title: req.body.title,
    year: req.body.year,
    director: req.body.director,
    runtime: req.body.runtime,
    userScore: req.body.userScore,
    review: req.body.review,
    userId: req.user.id,
  };
  Movie.create(movie)
    .then((movie) => res.status(200).json(movie))
    .catch((err) => res.status(500).json({ error: err }));
});

/**
 * const apiKey = process.env.APIKEY;

  const headers = {
    "Content-Type": "application/json",
  };

  const movieID = req.params.id;

  const movieURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`;

  fetch(movieURL, {
    method: "GET",
    headers: headers,
  })
    .then((result) => result.json())
    .then((movie) => {
      Movie.create({
        title: movie.title,
        year: movie.year,
        director: req.body.director,
        runtime: movie.runtime,
        userScore: req.body.userScore,
        review: req.body.review,
        userId: req.user.id,
      });
    })
    .then((movie) => res.status(200).json(movie))
    .catch((err) => res.status(500).json({ error: err }));

 * 
 * 
 */



// -----Get My Movies  -----
// GET:   http://localhost:3025/movie/
router.get("/", validateSession, (req, res) => {
  let userid = req.user.id;
  Movie.findAll({
    where: { userId: userid },
  })
    .then((movie) => res.status(200).json(movie))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get All Movies -----
// GET:   http://localhost:3025/movie/all
router.get("/all", (req, res) => {
  Movie.findAll()
    .then((movie) => res.status(200).json(movie))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Update Movie  -----
// PUT:   http://localhost:3025/movie/review/:id
router.put("/review/:id", validateSession, (req, res) => {
  const updateMovieScore = {
    userScore: req.body.userScore,
    review: req.body.review,
  };

  const query = { where: { id: req.params.id, userId: req.user.id } };

  Movie.update(updateMovieScore, query)
    .then((movie) => res.status(200).json(movie))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Delete a Movie Review  -----
// DEL:   http://localhost:3025/movie/review/:id
router.delete("/review/:id", (req, res) => {
  Movie.destroy({ where: { id: req.params.id } })
    .then((movie) => res.status(200).json(movie))
    .catch((err) => res.json(req.errors));
});

// -----  Admin delete a Movie Review  -----
// DEL:   http://localhost:3025/movie/review/:id
router.delete("/review/:id", (req, res) => {
  TvShow.destroy({ where: { role: true } })
    .then((tvshow) => res.status(200).json(tvshow))
    .catch((err) => res.json(req.errors));
});

module.exports = router;
