const passport = require('passport')
const express = require("express");
const router = express.Router();
const pool = require('../db')

const Projects = require('../models/Projects');
const catchWrap = require("../common/wrapper")

router.use('/projects', passport.authenticate('jwt', {session: false}))
//################projects list

//get all projects

// router.get("/projects", catchWrap(async (req, res) => {
//             const allProjects = await pool.query("SELECT * FROM projectsList");
//             res.json(allProjects.rows);
//     }))

router.get("/projects", catchWrap(async (req, res) => {
    const allProjects = await Projects.findAll()
    res.json(allProjects);
}))

//create project

router.post("/projects", catchWrap(async (req, res) => {
            const {name} = req.body;
            const newProject = await pool.query("INSERT INTO projectsList (name) VALUES($1) RETURNING *", [name]);
            res.json(newProject.rows[0]);
    }))

//get project

router.get("/projects/:id", catchWrap(async (req, res) => {
            const {id} = req.params;
            const project = await pool.query("SELECT * FROM projectsList WHERE projectid = $1", [id]);
            res.json(project.rows[0]);
    }))

//update project

router.put("/projects/:id", catchWrap(async (req, res) => {
            const {id} = req.params;
            const {name} = req.body;
            const updateProject = await pool.query("UPDATE projectsList SET name = $1 WHERE projectId = $2", [name, id]);
            res.json("Project updated");
    }))


//delete project
router.delete("/projects/:id", catchWrap(async (req, res) => {
            const {id} = req.params;
            const deletedProject = await pool.query("DELETE FROM projectsList WHERE projectId = $1", [id]);
            const deletedColumns = await pool.query("DELETE FROM kanbancolumns WHERE projectListId = $1", [id]);
            const deletedTasks = await pool.query("DELETE FROM tasks WHERE projectId = $1", [id]);
            res.json("Project deleted");
    }))

module.exports = router;