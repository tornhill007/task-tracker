module.exports = {
    wrapWhereColumnId: function (columnid) {
        return ({
            where: {
                columnid
            }
        })
    },
    wrapWhereProjectId: function (projectid) {
        return ({
            where: {
                projectid
            }
        })
    },
    wrapWhereId: function (id) {
        return ({
            where: {
                id
            }
        })
    },
    wrapWhereTaskId: function (taskid) {
        return ({
            where: {
                taskid
            }
        })
    },
    wrapWhereUserName: function (username) {
        return ({
            where: {
                username
            }
        })
    },

    wrapWhereProjectAndUserIds: function (projectid, userid) {
        return ({
            where: {
                projectid,
                userid
            }
        })
    },
}