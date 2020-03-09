const mongoose = require("mongoose");
const config = require('../env');

const { urlDB } = config;

module.exports = async function connect() {
    try{
        await mongoose.connect(urlDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("DB connected")
    }catch(err){
        console.log(err);
    }
}
