import mongoose from 'mongoose';

let isConnected = false; //variable to check if mongoose is connected

export const connectToDB = async () => {
    // Set strict query mode for Mongoose to prevent unknown field queries
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.log('Missing MongoDB URL');

    // If the connection is already established, return without creating a new connection.
    if(isConnected) return console.log('Already connected to MongDB')

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true; // Set the connection status to true
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
};
