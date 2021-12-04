const User = require('./../models/User');
const Dish = require('./../models/Dish');
const Order = require('./../models/Order');
const { mutiMongoosetoObject, MongoosetoObject } = require('./../../util/mongoose');

exports.getAllUser = async (req, res) => {
    if(req.user.permission !== 'Manager') res.redirect('/');
    req.params.page = req.params.page || 0;
    if (req.params.page < 0) req.params.page = 0;
    const skip = req.params.page * 5;
    const users = await User.find({}).skip(skip).limit(5);
    const count = await User.find({}).count();
    res.render('manage/show', { user: req.user, count, users: mutiMongoosetoObject(users), page: Number(req.params.page), length: mutiMongoosetoObject(users).length });
}
exports.updateUser = async (req, res) => {
    if(req.user.permission !== 'Manager') res.redirect('/');
    const users = await User.findOneAndUpdate({ phonenumber: req.params.phone }, req.body);
    res.redirect('/manage');
}
exports.deleteUser = async (req, res) => {
    if(req.user.permission !== 'Manager') res.redirect('/');
    const users = await User.findOneAndDelete({ phonenumber: req.params.phone });
    res.redirect('/manage');
}
exports.detailUser = async (req, res) => {
    if(req.user.permission !== 'Manager') res.redirect('/');
    const users = await User.findOne({ phonenumber: req.params.phone });
    const order = await Order.findOne({ userID: users._id });
    console.log(order);
    res.render('manage/detail', { user: req.user, users: MongoosetoObject(users), order: MongoosetoObject(order) });
}
exports.feedback = async (req, res) => {
    if(req.user.permission !== 'Manager') res.redirect('/');
    req.params.page = req.params.page || 0;
    if (req.params.page < 0) req.params.page = 0;
    const skip = req.params.page * 5;
    const feedback = await Order.find({}).skip(skip).limit(5);
    const count = await Order.find({}).count();
    res.render('manage/feedback', { user: req.user, count, feedback: mutiMongoosetoObject(feedback), page: Number(req.params.page), length: mutiMongoosetoObject(feedback).length });
}
exports.feedbackDelete = async (req, res) => {
    if(req.user.permission !== 'Manager') res.redirect('/');
    const feedback = await Order.findOneAndDelete({ userName: req.params.slug });
    res.redirect('/manage/feedback');
}
exports.note = async (req, res) => {
    if(req.user.permission !== 'Manager') res.redirect('/');
    res.render('manage/note', { user: req.user });
}