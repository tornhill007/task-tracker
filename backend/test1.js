
const Order = require('./models/order');
const Product = require('./models/product');
const Users = require('./models/Users');
const Projects = require('./models/Projects');
const Tasks = require('./models/Tasks');
const ProductOrder = require('./models/productorder');


const q = async () => {

    // Get all orders
    const allOrders = await Tasks.findAll({

            // where: {
            //     id: 1
            // },
            // Make sure to include the products
            // include: [{
            //     model: Projects,
            //     as: 'projects',
            //     required: true,
            //     where: {
            //         projectid: 147
            //     }
            // }
            // ]
        }
    );
    debugger;
    // const allOrders = await Order.findAll({
    //
    //         // where: {
    //         //     id: 1
    //         // },
    //         // Make sure to include the products
    //         include: [{
    //             model: Product,
    //             as: 'products',
    //             required: true,
    //             where: {
    //                 id: 2
    //             }
    //         }
    //         ]
    //     }
    // );

    // const orders = allOrders[0].orders;

    // allOrders.getProducts({where: {
    //
    //     }})

}

q();