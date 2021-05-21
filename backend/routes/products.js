const express = require("express");
const router = express.Router();

const Order = require('../models/order');
const Product = require('../models/product');
const ProductOrder = require('../models/productorder');

const catchWrap = require("../common/wrapper");

const {Sequelize, DataTypes} = require('sequelize');

router.post('/products/create', catchWrap(async (req, res) => {

    const {id, title, description, price} = req.body;
    // Create and save the order

        const newProduct = Product.build({
            id, title, description, price
        });
        await newProduct.save();
       // let result = await newProduct.save();
        res.json(newProduct);


    //
    // return res.status(200).json(savedOrder);

}));


router.get('/products', async (req, res) => {

    const allProducts = await Product.findAll({
        include: [{
            model: Order,
            as: 'orders',
            required: false,

        }
        ]
    });
    res.json(allProducts);
    // Get all orders
    // const allOrders = await Order.findAll({
    //
    //     // Make sure to include the products
    //     include: [{
    //         model: Product,
    //         as: 'products',
    //         required: false,
    //         through: {
    //             model: ProductOrder,
    //             as: 'productOrders',
    //         }
    //     }
    //     ]}
    // );
    //
    //
    // // If everything goes well respond with the orders
    // res.json(allOrders);
});


module.exports = router;

// {
//     "id": 15,
//     "address": "Keletskaya 100",
//     "product": {
//     "id": 25,
//         "quantity": 2
// }
// }