const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`🔌 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit the process with failure
    process.exit(1);
  }
};

module.exports = connectDB;