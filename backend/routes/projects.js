const passport = require('passport')
const express = require("express");
const router = express.Router();
const pool = require('../db')

const Projects = require('../models/Projects');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');
const UsersProjects = require('../models/UsersProjects');
const catchWrap = require("../common/wrapper")
const sequelize = require('../config/database');
const {QueryTypes} = require('sequelize');

router.use('/projects', passport.authenticate('jwt', {session: false}))
//################projects list

//get all projects

// router.get("/projects", catchWrap(async (req, res) => {
//             const allProjects = await pool.query("SELECT * FROM projectsList");
//             res.json(allProjects.rows);
//     }))

router.get("/projects", catchWrap(async (req, res) => {
    // let {userId} = req.query;
    let userId = req.query.userId

    console.log("userId", userId)
    console.log("req.query", req.query)

    // const allProjects = await Projects.findAll();
    const [results, metadata] = await sequelize.query("SELECT * FROM projectsList WHERE projectid IN (SELECT projectid FROM usersprojects WHERE userid = ?)", {
            replacements: [+userId],
        }
    );
    console.log(results)
    res.json(results);
}))



router.delete("/usersprojects/:id", catchWrap(async (req, res) => {
    let {id} = req.params;
    // console.log("userId", userId);
    const allProjects = await UsersProjects.destroy({
        where: {
            id
        }
    });
    // const [results, metadata] = await sequelize.query("SELECT * FROM projectsList WHERE projectid IN (SELECT projectid FROM usersprojects WHERE userid = 9)");

    // res.json(results);
    res.json(allProjects);
}))

//create project

// router.post("/projects", catchWrap(async (req, res) => {
//             const {name} = req.body;
//             const newProject = await pool.query("INSERT INTO projectsList (name) VALUES($1) RETURNING *", [name]);
//             res.json(newProject.rows[0]);
//     }))

router.post("/projects", catchWrap(async (req, res) => {
    const {name, userId} = req.body;
    console.log("userId", userId);
    console.log("name", name);
    const newProject = await Projects.create({
        name
    })
// console.log("newProject", newProject.dataValues.projectid);
// console.log("userId", userId);
    const userProject = await UsersProjects.create({
        projectid: newProject.dataValues.projectid,
        userid: userId
    })
    res.json(newProject);
}))


//get project

// router.get("/projects/:id", catchWrap(async (req, res) => {
//             const {id} = req.params;
//             const project = await pool.query("SELECT * FROM projectsList WHERE projectid = $1", [id]);
//             res.json(project.rows[0]);
//     }))

router.get("/projects/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const project = await Projects.findAll({
        where: {
            projectid: id
        }
    });
    res.json(project);
}))


//update project

// router.put("/projects/:id", catchWrap(async (req, res) => {
//             const {id} = req.params;
//             const {name} = req.body;
//             const updateProject = await pool.query("UPDATE projectsList SET name = $1 WHERE projectId = $2", [name, id]);
//             res.json("Project updated");
//     }))

router.put("/projects/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const updateProject = await Projects.update({name}, {
        where: {
            projectid: id
        }
    });
    res.json("Project updated");
}))


//delete project
// router.delete("/projects/:id", catchWrap(async (req, res) => {
//             const {id} = req.params;
//             const deletedProject = await pool.query("DELETE FROM projectsList WHERE projectId = $1", [id]);
//             const deletedColumns = await pool.query("DELETE FROM kanbancolumns WHERE projectListId = $1", [id]);
//             const deletedTasks = await pool.query("DELETE FROM tasks WHERE projectId = $1", [id]);
//             res.json("Project deleted");
//     }))

router.delete("/projects/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    console.log("id", id)

    const removeUsersProjects = await UsersProjects.destroy( {
        where: {
            projectid: id
        }
    })

    const deletedTasks = await Tasks.destroy({
        where: {
            projectid: id
        }
    });

    const deletedColumns = await Columns.destroy({
        where: {
            projectlistid: id
        }
    });

    const deletedProject = await Projects.destroy({
        where: {
            projectid: id
        }
    });

    res.json("Project deleted");
}))

module.exports = router;