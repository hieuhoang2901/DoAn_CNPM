const User = require('./../models/User');
const Dish = require('./../models/Dish');
const Order = require('./../models/Order');
const { mutiMongoosetoObject,MongoosetoObject }  = require('./../../util/mongoose');

exports.getAllUser = async (req, res) => {
    req.params.page = req.params.page || 0;
    if (req.params.page < 0) req.params.page = 0;
    const skip = req.params.page * 5;
    const user = await User.find({}).skip(skip).limit(5);
    const count = await User.find({}).count();
    res.render('manage/show', { count, user: mutiMongoosetoObject(user), page: Number(req.params.page), length: mutiMongoosetoObject(user).length });
}
exports.updateUser = async (req, res) => {
    const user = await User.findOneAndUpdate({ phone: req.params.phone }, req.body);
    res.redirect('/manage');
}
exports.deleteUser = async (req, res) => {
    const user = await User.findOneAndDelete({ phone: req.params.phone });
    res.redirect('/manage');
}
exports.detailUser = async (req, res) => {
    const user = await User.findOne({ phone: req.params.phone });
    const order = await Order.findOne({ userName: user._id });
    res.render('manage/detail', { user: MongoosetoObject(user), order: MongoosetoObject(order) });
}
exports.feedback = async (req, res) => {
    req.params.page = req.params.page || 0;
    if (req.params.page < 0) req.params.page = 0;
    const skip = req.params.page * 5;
    const feedback = await Order.find({}).skip(skip).limit(5);
    const count = await Order.find({}).count();
    res.render('manage/feedback', { count, feedback: mutiMongoosetoObject(feedback), page: Number(req.params.page), length: mutiMongoosetoObject(feedback).length });
}
exports.feedbackDelete = async (req, res) => {
    const feedback = await Order.findOneAndDelete({ userName: req.params.slug });
    res.redirect('/manage/feedback');
}
exports.note = async (req, res) => {
    res.render('manage/note');
}