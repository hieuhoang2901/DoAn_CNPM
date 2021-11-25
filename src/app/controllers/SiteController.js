const Dish = require('../models/Dish');
const User = require('../models/User');
const Cart = require('../models/Cart');
const jwt  = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { mutiMongoosetoObject } = require('../../util/mongoose');

class SiteController {
    home(req, res, next) {

        //var cart = new Cart(req.session.cart);
        Dish.find({ recommend: true })
            .then((dishes) => {
                res.render('Site/home', {
                    // cartdishes: req.session.cart ? cart.generateArray() : null ,
                    // totalPrice: req.session.cart ? cart.totalPrice : 0,
                    // totalQty: req.session.cart ? cart.totalQty : 0,
                    dishes: mutiMongoosetoObject(dishes),
                    user: req.user,
                });  
            })
            .catch(next);
    }

    search(req, res, next) {
        if(req.query.foodname){
            const searchFied = req.query.foodname;
            Dish.find({name:{$regex: searchFied, $options: '$i'}})
                .then((dishes) => {
                    res.render('Site/search', { 
                        user: req.user,
                        dishes: mutiMongoosetoObject(dishes),
                    });
                })    
        }
        else return res.render('Site/search', { user: req.user});   
    }

    loginpage(req, res, next) {
        res.render('Site/loginpage');
    }

    register(req, res) {
        res.render('Site/register');
    }

    resetpassword(req, res, next) {
        res.render('Site/resetpassword');
    }

    resetpasswordpost(req, res, next) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if(!user) res.render('Site/resetpassword',{message: 'User not found'});
                else {
                    const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
                    const payload = {
                        email: user.email,
                        id: user._id
                    }
                    const token = jwt.sign(payload, secret, {expiresIn: '10m'} );
                    const link  = 'http://localhost:3000/user/resetpassword/'+user._id+'/'+token;
                    console.log(link);
                    // const mailcontent = ' <p>This is an reset password link for '+user.email+'</p><p>the link will expires in 10 minute</p><a href='+link+'>Click here</a>'

                    // let transporter = nodemailer.createTransport({
                    //     service: 'gmail',
                    //     auth: {
                    //       user: process.env.HostMail, // generated ethereal user
                    //       pass: process.env.Mailpass, // generated ethereal password
                    //     }
                    //   });
                    
                    //   // send mail with defined transport object
                    //   let info ={
                    //     from: '"ResPos" <respos1357@gmail.com>', // sender address
                    //     to: user.email, // list of receivers
                    //     subject: "Reset password request", // Subject line
                    //     text: "Hello world?", // plain text body
                    //     html: mailcontent, // html body
                    //   };
                    //   transporter.sendMail(info)
                    //     .then(() =>{ res.render('Site/resetpassword',{message: 'A mail have been sent to your email'})})
                    //     .catch(err =>{res.json({message: err.message})})
                }
            })
            .catch((err) => {res.json({message: err})})
        
    }
}

module.exports = new SiteController();
