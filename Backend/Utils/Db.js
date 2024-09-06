import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Db_Connect = async () => {
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB Atlas successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB Atlas:', err.message);
    }
};

export default Db_Connect;  
