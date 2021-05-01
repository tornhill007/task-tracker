const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("./config/keys");
const app = express();
const cors = require("cors");
const pool = require("./db");


app.use(cors());
app.use(express.json());

//ROUTES
require("./routes/columns")(app, pool);
require("./routes/projects")(app, pool);
require("./routes/registration")(app, pool, bcrypt);
require("./routes/auth")(app, pool, bcrypt, jwt, keys);
require("./routes/tasks")(app, pool);


app.use(passport.initialize());
require('./middleware/passport')(passport);

app.listen(5000, () => {
    console.log("Server has started on 5000 port");
});

