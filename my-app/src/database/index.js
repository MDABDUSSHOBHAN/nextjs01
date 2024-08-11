import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

const connectToDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const uri = "mongodb+srv://nextjs:mzu5ZSNA9dzEbGPt@cluster0.7r2x3zj.mongodb.net/?appName=Cluster0";
    
    // Options can be included as needed
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Could not connect to the database.");
  }
};

export default connectToDB;
