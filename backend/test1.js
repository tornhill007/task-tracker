
const Order = require('./models/order');
const Product = require('./models/product');
const ProductOrder = require('./models/productorder');


const q = async () => {

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
                    id: 2
                }
            }
            ]
        }
    );

    // const orders = allOrders[0].orders;

    // allOrders.getProducts({where: {
    //
    //     }})
debugger;
}
q()