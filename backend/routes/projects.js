const passport = require('passport')

//################projects list

//get all projects
module.exports = function (app, pool) {
    app.get("/projects", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const allProjects = await pool.query("SELECT * FROM projectsList");
            res.json(allProjects.rows);
        } catch (err) {
            console.log(err);
        }
    })

//create project

    app.post("/projects", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {name} = req.body;
            const newProject = await pool.query("INSERT INTO projectsList (name) VALUES($1) RETURNING *", [name]);

            res.json(newProject.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    })

//get project

    app.get("/projects/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {id} = req.params;
            const project = await pool.query("SELECT * FROM projectsList WHERE projectid = $1", [id]);
            res.json(project.rows[0]);
        } catch (err) {
            console.log(err);
        }
    })

//update project

    app.put("/projects/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {id} = req.params;
            const {name} = req.body;
            const updateProject = await pool.query("UPDATE projectsList SET name = $1 WHERE projectId = $2", [name, id]);
            res.json("Project updated");
        } catch (err) {
            console.log(err);
        }
    })


//delete project
    app.delete("/projects/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {id} = req.params;
            const deleteProject = await pool.query("DELETE FROM projectsList WHERE projectId = $1", [id]);
            res.json("Project deleted");
        } catch (err) {
            console.log(err);
        }
    })

}