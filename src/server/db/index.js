import mongoose from "mongoose";

export default async function connect() {
    try{
        await mongoose.connect(
            process.env.URL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("DB connected")
    }catch(err){
        console.log(err);
    }
}
