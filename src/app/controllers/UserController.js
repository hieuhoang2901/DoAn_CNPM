const User = require('./../models/User');
const Dish = require('./../models/Dish');
const Order = require('./../models/Order');
exports.getAllUser = async (req, res) => {
    // await Order.find();
    res.send('sssssssss');
}

class UserController {


    // [POST] /user/payment 
    payment(req,res,next) {
        var arr = JSON.parse(req.body.cart);
        // res.json(arr);
        var cart = [];
        for(let i = 0; i < arr.length; i++)
        {
          cart.push({
            name: arr[i][0],
            price: arr[i][1],
            image: arr[i][2],
            qty: parseInt(arr[i][3]),
            id: arr[i][4],
          });
        }
        // res.json(cart);
         req.session.cart = cart;
        res.json(req.session.cart);
    }


}


module.exports = new UserController;