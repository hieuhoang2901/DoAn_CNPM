const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { type: String, unique: true },
        phonenumber: { type: Number },
        image: { type: Buffer },
        imageType: { type: String },
        imageName: { type: String},
        password: { type: String, required:true },
        permission: { type: String, default: 'Customer' },
        name: { type: String, maxlength: 100, required: true },
        address: { type: String },
        paymentInfo: {
            name: {type: String},
            number: {type: Number},
            month: {type: String },
            CVC: {type: Number},
        }
    },
    {
        timestamps: true,
    },
);
User.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        return this.sort({
            [req.query.column]: req.query.type,
        });
    }
    return this;
};
module.exports = mongoose.model('User', User);

