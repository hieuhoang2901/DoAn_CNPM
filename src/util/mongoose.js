const imageMimeTypes = ['image/jpg', 'image/png', 'image/gif','image/jpeg' ];
module.exports = {
  multipleMongooseToObject: function (mongooses) {
    return mongooses.map(mongoose => mongoose.toObject());
  },
  mongooseToObject: function(mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
  modifyRequestImage: function (req) {
    if (req.body.image) {
        const image = JSON.parse(req.body.image);
        if (image && imageMimeTypes.includes(image.type)) {
            req.body.image = new Buffer.from(image.data, 'base64');
            req.body.imageType = image.type;
        }
    }
  },
};
