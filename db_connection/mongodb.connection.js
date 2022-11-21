const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const db = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
module.exports = db
