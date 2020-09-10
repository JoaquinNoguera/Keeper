const mongoose = require("mongoose");


module.exports = async function connect() {
    try{
        await mongoose.connect(process.env.URL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("DB connected");
    }catch(err){
        console.log(err);
    }
}
