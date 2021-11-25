const Dish = require('../models/Dish');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { mutiMongoosetoObject, MongoosetoObject,  modifyRequestImage} = require('../../util/mongoose');
const { Mongoose } = require('mongoose');
const { response } = require('express');

class UserController {
    index(req, res, next) {

        var cart = new Cart(req.session.cart);
        // if(cart) res.json(cart);
        res.render('user/userinfo',{
            user: req.user,
            cartdishes: cart.generateArray(),
            totalPrice: cart.totalPrice,
            totalQty: cart.totalQty
        })
    }
    // [GET] /user/ordered
    ordered(req, res, next) {
        //res.json(req.user._id)
        var cart = new Cart(req.session.cart);
        Order.find({userID: req.user._id}).sort({createdAt : -1})
            .then((orders) => {
                res.render('user/ordered',{
                    cartdishes: cart.generateArray(),
                    totalPrice: cart.totalPrice,
                    totalQty: cart.totalQty,
                    user: req.user,
                    orders: mutiMongoosetoObject(orders)
                })
            })
            .catch(next)
        
    }

    // [GET] /user/ordering
    ordering(req, res, next) {
        // if(!req.session.cart)   {
        //     return res.render('user/cart', {cartdishes: null});
        // }
        var cart = new Cart(req.session.cart);
        // if(cart) res.json(cart);
        res.render('user/cart',{
            user: req.user,
            cartdishes: cart.generateArray(),
            totalPrice: cart.totalPrice,
            totalQty: cart.totalQty
        })
    }

    //[POST] /user/stored-order

    storedOrder(req,res,next) {
        if(!req.session.cart) return res.redirect('/user/ordered');
        User.updateOne({_id: req.user._id},{
            $set: {
                paymentInfo: req.body.name ? req.body : req.user.paymentInfo
            }
        })
            .then (() => {
                var cart = new Cart(req.session.cart);
                let newOrder = new Order ({
                    userID: req.user._id,
                    userName: req.user.name,
                    userAddress: req.user.address,
                    totalPrice: cart.totalPrice+5,
                    orders: cart.generateArray(),
                    totalQty: cart.totalQty,
                    paymentMethod: req.body.method,
                    paymentStatus: req.body.method == 'COD' ? 'Unpaid' : 'Paid' 
                });

                newOrder.save()
                        .then(() => {
                            // console.log('Order stored successful');
                            req.session.cart = null;
                            res.redirect('/user/ordered');
                        })
                        .catch(next);

            })
            .catch(next);

    }

    //[POST] /user/delete-order/:id
    deleteOrder(req,res,next){
        // res.json('Deleted ' +req.body.id);
        Order.delete({_id: req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next);
    }
    
    //[POST] /user/cancel-order/:id
    cancelOrder(req,res,next){
        Order.updateOne({_id: req.params.id},{
            $set: {status: 'Canceled'}
        })
            .then(()=> res.redirect('back'))
            .catch(next)
    }

    //[GET] /user/complete/:id
    complete(req,res,next) {
        // var cart = new Cart(req.session.cart);
        // var cartdishes = cart.generateArray();
        // // console.log(cartdishes);
        // for(let i=0; i< cartdishes.length; i++)
        // {
        //     Dish.updateOne({_id :cartdishes[i].item._id},{
        //         $set : {
        //             sale: cartdishes[i].item.sale + cartdishes[i].price
        //         }
        //     })
        //         .then()
        //         .catch(next);
        // }
        // req.session.cart = null;
        // res.redirect('/user/ordered');

        Order.findByIdAndUpdate( req.params.id,{
            $set: {
                status: 'Completed',
                paymentStatus: 'Paid'
            }
        })
            .then((order) => {
                var arr = order.orders;
                for(let i=0; i< arr.length;i++)
                {
                    Dish.updateOne({ _id : arr[i].item._id},{$inc : {sale: arr[i].qty}})
                        .then()
                        .catch(next);
                }
                
                res.redirect('/user/ordered');
            })
            .catch(next);
    }


    // [GET] /user/payment
    payment(req, res, next) {
        // res.render('user/onlPayment',{user: req.user})
        var cart = new Cart(req.session.cart);
        if(!req.session.cart ) return res.redirect('back');
        res.render('User/onlPayment',{
            noheader: true,
            user: req.user,
            cartdishes: cart.generateArray(),
            subtotalPrice: cart.totalPrice,
            totalPrice: cart.totalPrice + 5,
            totalQty: cart.totalQty,
        })
    }

    // [POST] /user/add-to-cart/:id
    addToCart(req, res, next){
        var cart = new Cart(req.session.cart);
        
        Dish.findById(req.body.id)
            .then((dish) => {
                for(let i=0; i<req.body.qty; i++){
                cart.add(MongoosetoObject(dish), dish._id);
                }
                req.session.cart = cart;
                //console.log(req.session.cart);
                res.redirect('back');
                // res.json(req.session.cart);
            })
            .catch(next);
    }

    // [POST] /user/remove-from-cart
    removeFromCart(req, res, next) {
        var cart = new Cart(req.session.cart);
        
        Dish.findById(req.body.id)
            .then( ()=> {
                cart.remove(req.body.id);
                req.session.cart = cart;
                console.log(req.session.cart);
                res.redirect('back');
                // res.json(req.session.cart);
            })
            .catch(next);

       
    }

    // [POST] /user/updateImage
    updateImage(req, res, next) {
        if(req.body.image) {
        //     // res.json(req.body);
            modifyRequestImage(req);
            // res.json(req.body.imageType);
            User.updateOne({_id: req.params.id },{$set:{image: req.body.image, imageType: req.body.imageType, name: req.body.name, address: req.body.address}})
                .then(() => res.redirect('back'))
                .catch(next);
        }
        else if (req.body.name){
            User.updateOne({ _id: req.params.id },{ $set: { name: req.body.name, address: req.body.address } })
                .then(() => res.redirect('back'))
                .catch(next);
        }
    }

    // [POST] /user/register
    register(req, res, next) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    res.render('Site/register', {
                        resinfo: req.body,
                        message: 'User existed',
                    });
                } 
                else if (req.body.password != req.body.cfpassword) {
                    res.render('Site/register', {
                        resinfo: req.body,
                        message: 'Password not match',
                    });
                } else {
                    bcryt.hash(req.body.password,10,function (err, hashedPass) {
                            if (err) return res.json(err);
                            let newuser = new User({
                                email: req.body.email,
                                phonenumber: req.body.phonenumber,
                                password: hashedPass,
                                name: req.body.name,
                                gender: req.body.gender,
                                address: req.body.address,
                            });
                            newuser
                                .save()
                                .then(() => res.redirect('back'))
                                .catch((error) => {
                                    res.json({ message: error });
                                });
                        },
                    );
                }
            })
            .catch((error) => res.json({ message: error.message }));
    }

    // [POST] /user/login
    login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user)
                    return res.render('site/loginpage', {
                        message: 'Wrong user or password',
                    });
                const email = user.email;
                bcryt.compare(req.body.password, user.password)
                    .then((result) => {
                        if (!result)
                            return res.render('site/loginpage', {
                                message: 'Wrong user or password',
                                name: req.body.email,
                            });
                        const token = jwt.sign({ username: email },process.env.ACCESS_TOKEN_SECRET,);
                        req.headers.authorization = 'Bearer ' + token;
                        next();
                    })
                    .catch((error) => {
                        res.send({ message: error });
                    });
            })
            .catch(next);
    }
    // [GET] /user/logout
    logout(req, res, next) {
        if (req.session) {
            // delete session object
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/');
                }
            });
        }
    }

    // [GET] /user/resetpassword/:id/:token
    resetPassword(req, res, next) {
        const {id, token} = req.params
        User.findOne({_id: id})
            .then(user =>{
                user = user.toObject();
                if(!user){
                    res.send('invalid id or token');
                    return
                }
                const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
                try {
                    const payload = jwt.verify(token,secret);
                    res.render('user/resetUserPassword',{email: user.email, id: id, token})
                }catch(err){
                    res.send(err.message);
                }
            })
            .catch(err => {res.send(err.message)});
    }

    // [PUT] /user/updatepassword/:id/:token
    updatePassword(req, res, next){
        const {id, token} = req.params
        User.findOne({_id: id})
            .then(user =>{
                user = user.toObject();
                if(!user){
                    res.send('invalid id or token');
                    return
                }
                const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
                try {
                    const payload = jwt.verify(token,secret);
                    bcryt.hash(req.body.password,10,function (err, hashedPass) {
                        if (err){ 
                            res.json(err) 
                            return 
                        };
                        User.updateOne({ _id: id}, {$set: {password: hashedPass}})
                            .then(() => res.redirect('/loginpage'))
                            .catch(err =>{res.json(err.message)});
                    })
                }catch(err){
                    res.send(err.message);
                }
            })
            .catch(err => {res.send(err.message)});
    }
    
    viewTableReservation(req, res, next) {
        Table.find({email: req.user.email})
            .then((newtable) => {
                res.render('User/viewbooktable-2', {
                    newtable: mutiMongoosetoObject(newtable)
                })
            })
            .catch(next);
    }
    viewTableReservation2(req, res, next) {
        Table.find({email: req.user.email})
            .then((newtable) => {
                res.render('User/viewbooktable-2', {
                    newtable: mutiMongoosetoObject(newtable),
                    user: req.user,
                })
            })
            .catch(next);
    }
}

module.exports = new UserController();
