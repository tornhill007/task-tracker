const { Sequelize } = require('sequelize');

// module.exports = new Sequelize('testdb', 'komar', '12345', {
//     host: 'localhost',
//     dialect: 'postgres',
//     define: {
//         timestamps: false
//     },
// });

module.exports = new Sequelize('testdb', 'komar', '12345', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false
    },
});
