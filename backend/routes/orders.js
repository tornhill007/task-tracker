const express = require("express");
const router = express.Router();

const Order = require('../models/order');
const Product = require('../models/product');
const ProductOrder = require('../models/productorder');

const catchWrap = require("../common/wrapper");


const {Sequelize, DataTypes} = require('sequelize');

router.post('/orders/create', catchWrap(async (req, res) => {

    // Create and save the order
    const savedOrder = Order.build(req.body, {w: 1}, {returning: true});

    const product = await Product.findOne({
        where: {
            id: req.body.product.id
        }
    });

    if (!product) {
        return res.status(400);
    }

    await savedOrder.addProduct(product);

    // const productOrder = {
    //     orderid: savedOrder.id,
    //     productid: req.body.product.id,
    //     quantity: req.body.product.quantity
    // }

    // const savedProductOrder = ProductOrder.build(productOrder, { w: 1 }, { returning: true });

    // await savedProductOrder.save();


    await savedOrder.save();
    return res.status(200).json(savedOrder);

}));

// router.delete('/orders/create', catchWrap(async (req, res) => {
//
//     // Create and save the order
//     const savedOrder = await ProductOrder.destroy({truncate: true});
//
//     return res.json("deleted");
//
// }));


router.get('/orders', async (req, res) => {

    // Get all orders
    const allOrders = await Order.findAll({

            // where: {
            //     id: 1
            // },
            // Make sure to include the products
            include: [{
                model: Product,
                as: 'products',
                required: true,
                where: {
                    id: 1
                }
            }
            ]
        }
    );

    // const orders = allOrders[0].orders;

    // allOrders.getProducts({where: {
    //
    //     }})


    // If everything goes well respond with the orders
    res.json(allOrders);
});


module.exports = router;