const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("./config/keys");
const app = express();
const cors = require("cors");
const pool = require("./db");

const tasks = require('./routes/tasks');
const columns = require('./routes/columns');
const projects = require('./routes/projects');
const auth = require('./routes/auth');
const users = require('./routes/users');
const usersprojects = require('./routes/usersprojects');
const userstasks = require('./routes/userstasks');

const sequelize = require('./config/database')

//Test DB

sequelize.authenticate().then(() => {
    console.log("Database connected...")
}).catch((err) => {
    console.log("Error:" + err);
})

app.use(cors());
// app.use(auth);
app.use(express.json());
app.use(tasks);
app.use(columns);
app.use(projects);
app.use(auth);
app.use(users);
app.use(usersprojects);
app.use(userstasks);


app.use(passport.initialize());
require('./middleware/passport')(passport);

app.listen(5000, () => {
    console.log("Server has started on 5000 port");
});

