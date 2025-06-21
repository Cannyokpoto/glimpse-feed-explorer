import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    
    mongoose.set('strictQuery', true);

    //if DB is already connected, don't connect again
    if(connected){
        console.log('DB connected successfully');
        return;
    }

    

    //connect to DB
    try {
        await mongoose.connect(process.env.DATABASE);
        connected = true;
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;