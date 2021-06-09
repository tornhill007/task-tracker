const express = require("express");
const router = express.Router();
const Users = require('../models/Users');
const Tasks = require('../models/Tasks');


//################registration

const catchWrap = require("../common/wrapper")


router.get("/task/user/:taskId/:userId", catchWrap(async (req, res) => {

    let {userId, taskId} = req.params;
    const users = await Users.findAll({
        include: [{
            model: Tasks,
            as: 'newTasks',
            required: true,
            where: {
                taskid: taskId,
            },
        }
        ],
    });

    res.json(users);

}))

module.exports = router;