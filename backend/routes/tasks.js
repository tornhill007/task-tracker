//###########tasks
const passport = require('passport')

module.exports = function (app, pool) {

    //create new task

    app.post("/task", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {taskName, description, users, markers, columnId, projectId} = req.body;
            const newTask = await pool.query("INSERT INTO tasks (taskName, description, users, markers, columnId, projectId) VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [taskName, description, users, markers, columnId, projectId]);

            res.json(newTask.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    })


//get all project's tasks
//
    app.get("/tasks/:projectId", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {projectId} = req.params;
            const allTasks = await pool.query("SELECT * FROM tasks WHERE projectId = $1", [projectId]);
            res.json(allTasks.rows);
        } catch (err) {
            console.log(err);
        }
    })



    //get all column's tasks

    app.get("/tasks", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {columnId} = req.body;
            const allTasks = await pool.query("SELECT * FROM tasks WHERE columnId = $1", [columnId]);
            res.json(allTasks.rows);
        } catch (err) {
            console.log(err);
        }
    })

//get task

    app.get("/tasks/:projectId/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {id} = req.params;
            const task = await pool.query("SELECT * FROM tasks WHERE taskId = $1", [id]);
            res.json(task.rows[0]);
        } catch (err) {
            console.log(err);
        }
    })


//update task

    app.put("/tasks/:projectId/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {id} = req.params;
            const {taskName, description, users, markers, columnId} = req.body;
            if(columnId) {
                const updateTask = await pool.query("UPDATE tasks SET columnId = $1 WHERE taskId = $2", [columnId, id]);
            }
            else {
                const updateTask = await pool.query("UPDATE tasks SET taskName = $1, description = $2, users = $3, markers = $4 WHERE taskId = $5", [taskName, description, users, markers, id]);
            }
            res.json("Column updated");
        } catch (err) {
            console.log(err);
        }
    })


//delete task
    app.delete("/tasks/:projectId/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {id} = req.params;
            const deleteTask = await pool.query("DELETE FROM tasks WHERE columnId = $1", [id]);
            res.json("Project deleted");
        } catch (err) {
            console.log(err);
        }
    })
}