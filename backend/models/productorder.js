const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/database');


// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ProductOrder extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   ProductOrder.init({
//     id: DataTypes.UUID,
//     productId: DataTypes.UUID,
//     orderId: DataTypes.UUID,
//     quantity: DataTypes.DECIMAL
//   }, {
//     sequelize,
//     modelName: 'ProductOrder',
//   });
//   return ProductOrder;
// };

const ProductOrders = db.define('productorders', {
        id: {
          primaryKey: true,
            autoIncrement: true,
          type: DataTypes.UUID
        },
        productid: DataTypes.UUID,
        orderid: DataTypes.UUID,
        quantity: DataTypes.DECIMAL
    },
    {
        tableName: 'productorders'
    })

module.exports = ProductOrders;