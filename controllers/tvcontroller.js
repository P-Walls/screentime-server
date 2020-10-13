let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const TvShow = require("../db").import("../models/tvshow");

// Endpoints
// POST:  http://localhost:3025/tv/review
// GET:   http://localhost:3025/tv/
// GET:   http://localhost:3025/tv/all
// PUT:   http://localhost:3025/tv/review/:id
// DEL:   http://localhost:3025/tv/review/:id

// -----  Movie Create  -----
// POST:  http://localhost:3025/tv/review
router.post("/review", validateSession, (req, res) => {
  const tvshow = {
    title: req.body.title,
    network: req.body.network,
    seasons: req.body.seasons,
    userScore: req.body.userScore,
    review: req.body.review,
    userId: req.user.id,
  };
  TvShow.create(tvshow)
    .then((tvshow) => res.status(200).json(tvshow))
    .catch((err) => res.status(500).json({ error: err }));
});
// -----Get My TV Shows  -----
// GET:   http://localhost:3025/tv/
router.get("/", validateSession, (req, res) => {
  let userid = req.user.id;
  TvShow.findAll({
    where: { userId: userid },
  })
    .then((tvshow) => res.status(200).json(tvshow))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Get All TV Shows -----
// GET:   http://localhost:3025/tv/all
router.get("/all", (req, res) => {
  TvShow.findAll()
    .then((tvshow) => res.status(200).json(tvshow))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Update TV Show Review  -----
// PUT:   http://localhost:3025/tv/review/:id
router.put("/review/:id", validateSession, (req, res) => {
  const updateTVScore = {
    userScore: req.body.userScore,
    review: req.body.review
  };

  const query = { where: { id: req.params.id, userId: req.user.id } };      

  TvShow.update(updateTVScore, query)
    .then((tvshow) => res.status(200).json(tvshow))
    .catch((err) => res.status(500).json({ error: err }));
});

// -----  Delete a TV Review  -----
// DEL:   http://localhost:3025/tv/review/:id
router.delete("/review/:id", (req, res) => {
  TvShow.destroy({ where: { id: req.params.id } })
    .then((tvshow) => res.status(200).json(tvshow))
    .catch((err) => res.json(req.errors));
});

// -----  Admin delete a TV Review  -----
// DEL:   http://localhost:3025/tv/review/:id
router.delete("/review/:id", (req, res) => {
  TvShow.destroy({ where: { role: true } })
    .then((tvshow) => res.status(200).json(tvshow))
    .catch((err) => res.json(req.errors));
});

module.exports = router;