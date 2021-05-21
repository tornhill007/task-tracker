const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');



const Order = require('./order');
const ProductOrders = require('./productorder');

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Product.belongsToMany(models.Order, {
//         through: 'ProductOrders',
//         as: 'orders',
//         foreignKey: 'productId',
//         otherKey: 'orderId'
//       });
//     }
//   };
//   Product.init({
//     id: DataTypes.UUID,
//     title: DataTypes.STRING,
//     description: DataTypes.TEXT,
//     price: DataTypes.DECIMAL
//   }, {
//     sequelize,
//     modelName: 'Product',
//   });
//   return Product;
// };

const Product = db.define('products', {
        id: {
          primaryKey: true,
            autoIncrement: true,
          type: DataTypes.UUID,
            allowNull: false
        },
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.DECIMAL
    },
    {
        tableName: 'products'
    })



module.exports = Product;