const User      =  require('../models/Userid');
const bcryt = require('bcrypt');
const { mutiMongoosetoObject,MongoosetoObject }  = require('../../util/subfuntion');

class AdminController {
    //[Get] /Admin
    index(req, res, next) {
            if(!req.query.page) req.query.page = 1;
            // res.json(req.session.email);
            Promise.all([User.find({}).limit(6).skip((req.query.page - 1) * 6).sortable(req), User.countDocuments()])
                .then(([users, count,deletedCount]) => {
                    res.render('Admin/viewusers', {
                        //noheader: true,
                        page: req.query.page,
                        users: mutiMongoosetoObject(users),
                        user:req.user,
                        count,
                        deletedCount,
                    });
                })
                .catch(next);
    }

    //[Get] /Admin/createManager
    createManager(req, res){
        res.render('Admin/createManager',)
    }

    //[Post] /Admin/createManager
    createManagerPost(req, res){
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    res.render('Admin/createManager', {
                        resinfo: req.body,
                        message: 'User existed',
                    });
                } 
                else if (req.body.password != req.body.cfpassword) {
                    res.render('Admin/createManager', {
                        resinfo: req.body,
                        message: 'Password not match',
                    });
                } else {
                    bcryt.hash(req.body.password,10,function (err, hashedPass) {
                            if (err) return res.json(err);
                            let newuser = new User({
                                email: req.body.email,
                                phonenumber: req.body.phonenumber,
                                permission: 'Manager',
                                password: hashedPass,
                                name: req.body.name,
                                gender: req.body.gender,
                                address: req.body.address,
                            });
                            newuser
                                .save()
                                .then(() => res.redirect('/loginpage'))
                                .catch((error) => {
                                    res.json({ message: error });
                                });
                        },
                    );
                }
            })
            .catch((error) => res.json({ message: error.message }));
    }

    //[Delete] /Admin/deleteUser/:id
    deleteUser(req, res){
        //res.json({id: req.params.id})
        User.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(err => res.json(err))
    }

    //[POST] /menu/handle-form-action
    handleFormAction(req, res, next){
        //res.json(req.body)
        switch(req.body.action){
            case 'delete':
                User.deleteMany({ _id: { $in : req.body.userIds} })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'changeToManager':
                User.updateMany({ _id: { $in : req.body.userIds} }, {permission: 'Manager'})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'changeToCustomer':
                User.updateMany({ _id: { $in : req.body.userIds} }, {permission: 'Customer'})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.send('Invalid Action');
        }
    }
}

module.exports = new AdminController();