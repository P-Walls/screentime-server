require("dotenv").config();
let express = require("express");
let app = express();

let sequelize = require("./db");
sequelize.sync();

app.use(express.json());
app.use(require("./middleware/headers"));


let user = require("./controllers/usercontroller");
app.use("/user", user);

let movie = require("./controllers/moviecontroller");
app.use("/movie", movie);


let tvshow = require("./controllers/tvcontroller");
app.use("/tv", tvshow);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
