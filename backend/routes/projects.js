const passport = require('passport')
const express = require("express");
const router = express.Router();
const pool = require('../db')

const Projects = require('../models/Projects');
const Columns = require('../models/Columns');
const Tasks = require('../models/Tasks');
const UsersProjects = require('../models/UsersProjects');
const Users = require('../models/Users');
const catchWrap = require("../common/wrapper")
const sequelize = require('../config/database');
const {QueryTypes} = require('sequelize');
const {wrapWhereProjectId, wrapWhereId} = require('../common/wrapWhere')
const jwt = require("jsonwebtoken");
const keys = require('../config/keys');

const {removingProject} = require('../common/removingProject')


router.use('/projects', passport.authenticate('jwt', {session: false}), async function (req, res, next) {
    const user = await Users.findUserByUserId(req.query.userId ? req.query.userId : req.body.userId);
    let decoded = jwt.verify(req.headers.authorization.split(' ')[1], keys.jwt);
    if(decoded.userId !== user.userid) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }
    next();
})


//################projects list

//get all projects

router.get("/projects", catchWrap(async (req, res) => {
    // let {userId} = req.query;
    let userId = req.query.userId

    const results = await Projects.findAll({

            include: [{
                model: Users,
                as: 'users',
                required: true,
                where: {
                    userid: +userId
                }
            }
            ]
        }
    );

    // const [results, metadata] = await sequelize.query("SELECT * FROM projectsList WHERE projectid IN (SELECT projectid FROM usersprojects WHERE userid = ?)", {
    //         replacements: [+userId],
    //     }
    // );

    res.json(results);
}))



// router.delete("/usersprojects/:id", catchWrap(async (req, res) => {
//     let {id} = req.params;
//     const allProjects = await UsersProjects.findOne(wrapWhereId(id));
//     // const [results, metadata] = await sequelize.query("SELECT * FROM projectsList WHERE projectid IN (SELECT projectid FROM usersprojects WHERE userid = 9)");
//     await allProjects.destroy();
//     // res.json(results);
//     res.json(allProjects);
// }))

//create project

router.post("/projects", catchWrap(async (req, res) => {
    const {name, userId} = req.body;
    // const newProject = Projects.buildProjectByName(name)
    const newProject = Projects.buildProjectByName(name)
    await newProject.save();

    const user = await Users.getUserByUserId(userId)

    await newProject.addUser(user);

    // const userProject = UsersProjects.buildUsersProject(newProject.dataValues.projectid, userId);
    // await userProject.save();
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
    const updateProject = await Projects.updateProjectNameByProjectId(id);
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

// router.delete("/columns", catchWrap(async (req, res) => {
//     const {id} = req.params;
// await Columns.destroy({
//     truncate: true
// })
//     // await removingProject({id});
//     res.json("Project deleted");
//
// }))

module.exports = router;