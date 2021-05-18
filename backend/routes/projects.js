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

const {removingProject} = require('../common/removingProject')

router.use('/projects', passport.authenticate('jwt', {session: false}))
//################projects list

//get all projects

router.get("/projects", catchWrap(async (req, res) => {
    // let {userId} = req.query;
    let userId = req.query.userId

    // const allProjects = await Projects.findAll({
    //     include: [
    //         {
    //             model: UsersProjects,
    //         },
    //     ]
    // });
    const [results, metadata] = await sequelize.query("SELECT * FROM projectsList WHERE projectid IN (SELECT projectid FROM usersprojects WHERE userid = ?)", {
            replacements: [+userId],
        }
    );
    res.json(results);
}))



router.delete("/usersprojects/:id", catchWrap(async (req, res) => {
    let {id} = req.params;
    const allProjects = await UsersProjects.findOne({
        where: {
            id
        }
    });
    // const [results, metadata] = await sequelize.query("SELECT * FROM projectsList WHERE projectid IN (SELECT projectid FROM usersprojects WHERE userid = 9)");
    await allProjects.destroy();
    // res.json(results);
    res.json(allProjects);
}))

//create project

router.post("/projects", catchWrap(async (req, res) => {
    const {name, userId} = req.body;
    const newProject = Projects.build({
        name
    })
    await newProject.save();

    const userProject = UsersProjects.build({
        projectid: newProject.dataValues.projectid,
        userid: userId
    })
    await userProject.save();
    res.json(newProject);
}))


//get project

// router.get("/projects/:id", catchWrap(async (req, res) => {
//     const {id} = req.params;
//     const project = await Projects.findAll({
//         where: {
//             projectid: id
//         }
//     });
//     res.json(project);
// }))


//update project

router.put("/projects/:id", catchWrap(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const updateProject = await Projects.findOne({
        where: {
            projectid: id
        }
    });
    updateProject.name = name;
    await updateProject.save();
    res.json("Project updated");
}))


//delete project

router.delete("/projects/:id", catchWrap(async (req, res) => {
    const {id} = req.params;

    await removingProject({id});
    res.json("Project deleted");

}))

module.exports = router;