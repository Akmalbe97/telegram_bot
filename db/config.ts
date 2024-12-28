import mongoose from "mongoose"

async function connectDB() {
  try {
    const DB_URI = process.env.DB_URI

    if(!DB_URI) {
      throw new Error("DB_URI not found")
    }

    await mongoose.connect (DB_URI)
      console.log("connect to database");
      
  } catch (error: any) {
    console.log(error.message);
    
  }
}

export default connectDB