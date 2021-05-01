//###########kanban columns

const passport = require('passport')

//create new column
module.exports = function (app, pool) {
    app.post("/column", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {name} = req.body;
            const {projectListId} = req.body;
            const newColumn = await pool.query("INSERT INTO kanbancolumns (name, projectListId) VALUES($1,$2) RETURNING *", [name, projectListId]);

            res.json(newColumn.rows[0]);
        } catch (err) {
            console.log(err.message);
        }
    })


//get all columns

    app.get("/columns", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const allColumns = await pool.query("SELECT * FROM kanbancolumns");
            res.json(allColumns.rows);
        } catch (err) {
            console.log(err);
        }
    })


//get column

    app.get("/columns/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {id} = req.params;
            const column = await pool.query("SELECT * FROM kanbancolumns WHERE columnid = $1", [id]);
            res.json(column.rows[0]);
        } catch (err) {
            console.log(err);
        }
    })

//update column

    app.put("/columns/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {id} = req.params;
            const {name} = req.body;
            const updateColumn = await pool.query("UPDATE kanbancolumns SET name = $1 WHERE columnId = $2", [name, id]);
            res.json("Column updated");
        } catch (err) {
            console.log(err);
        }
    })

//delete column
    app.delete("/columns/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {id} = req.params;
            const deleteColumn = await pool.query("DELETE FROM kanbancolumns WHERE columnId = $1", [id]);
            res.json("Project deleted");
        } catch (err) {
            console.log(err);
        }
    })
}