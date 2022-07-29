import mongoose from "mongoose";

const connection = { isConnected: null };

// Connect to Databse
const connectDB = async () => {
  // Db is connected
  if (connection.isConnected) {
    console.log("Database is already connected!...");
    return;
  }

  if (mongoose.connections.length > 0) {
    console.log("What is inside [ Mongoose.connenctions ]...");
    connection.isConnected = mongoose.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log("Use previous connection");
      return;
    }
    await mongoose.disconnect();
  }

  // No DB connection, connect DB Here!
  const db = await mongoose.connect(process.env.DATABASE_URI);
  console.log("New DB connection...");
  connection.isConnected = db.connection[0].readyState;
};

// Disconnect From Database
async function disconnectDB() {
  if (connection.isConnected && process.env.NODE_ENV === "production") {
    await mongoose.disconnect();
    connection.isConnected = false;
  }
}

const db = { connectDB, disconnectDB };
export default db;
