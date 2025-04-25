import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database Connected!'));

    await mongoose.connect(`${process.env.MONGODB_URI}/prescriptoDOC`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true, // 🔥 Important for Atlas SSL
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
