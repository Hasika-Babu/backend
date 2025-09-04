import mongoose from "mongoose";

let isConnected = false;

const DBConnect = async() => {
    if(isConnected == true) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        isConnected = true
        console.log("DB Connected.")
    } catch (error) {
        console.log("DB Not Connected : " + error);
    }
}

export default DBConnect;