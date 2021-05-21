const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');

const Product = require('./product');
const ProductOrders = require('./productorder');

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Order extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Order.belongsToMany(models.Product, {
//         through: 'ProductOrders',
//         as: 'products',
//         foreignKey: 'orderId',
//         otherKey: 'productId'
//       });
//     }
//   };
//   Order.init({
//     id: {
//       type: DataTypes.UUID,
//     },
//     address: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Order',
//   });
//   return Order;
// };

const Order = db.define('orders', {
        id: {
          primaryKey: true,
            autoIncrement: true,
          type: DataTypes.UUID,
            allowNull: false
        },
        address: DataTypes.STRING
    },
    {
        tableName: 'orders'
    })

Order.belongsToMany(Product, {
        through: ProductOrders,
        as: 'products',
        foreignKey: 'orderid',
        otherKey: 'productid'
      });

Product.belongsToMany(Order, {
  through: ProductOrders,
  as: 'orders',
  foreignKey: 'productid',
  otherKey: 'orderid'
});
// Projects.belongsToMany(Users, {through: UsersProjects});


module.exports = Order;