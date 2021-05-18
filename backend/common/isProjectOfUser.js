const sequelize = require('../config/database');

module.exports = {
    isProjectOfUsers: async (req, res, next) => {
        let userId = req.query.userId

        console.log("userId", userId)
        console.log("req.query", req.query)

        // const allProjects = await Projects.findAll();
        const [results, metadata] = await sequelize.query("SELECT * FROM projectsList WHERE projectid IN (SELECT projectid FROM usersprojects WHERE userid = ?)", {
                replacements: [+userId],
            }
        );
        if(req.user.admin){
            next();
        }else{
            res.status(403).send();
        }
    }
}