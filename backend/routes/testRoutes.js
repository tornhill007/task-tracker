const express = require("express");
const router = express.Router();
const catchWrap = require("../common/wrapper");
const Student = require('../models/Students');
const University = require('../models/University');
// const StudentsUniversity = require('../models/StudentsUniversity');


router.get("/test", catchWrap(async (req, res, next) => {

    const newTask = await Student.findAll({

        include: University
    })

    // let rese = await newTask.addUniversity(newTask);
    // await newTask.save();
    res.json(newTask);

}))
//
// router.post("/test", catchWrap(async (req, res, next) => {
//
//     const newTask = await Student.create({
//         studentname: "Max"
//     })
//     await newTask.addUniversity({})
//     // await newTask.save();
//     res.json(newTask);
//
// }))

router.post("/university", catchWrap(async (req, res, next) => {

    const newTask = await University.create({
        universityname: "VNTU"
    })
    // newTask.addUniversity()
    // await newTask.save();
    res.json(newTask);

}))

module.exports = router;