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
    // @ts-ignore
    connection.isConnected = mongoose.connections[0]._readyState;

    if (connection.isConnected === 1) {
      console.log("Using previous connection...");
      return;
    }
    await mongoose.disconnect();
  }

  // No DB connection, connect DB Here!
  const databaseOptions = {
    // useNewUrlParser: true,  /* Not-supported / deprecated */
    // useUnifiedTopology: true, /* Not-supported / deprecated */
    autoIndex: true,
    // useCreateIndex: true,      /* Not-supported / deprecated */
    // useFindAndModify: false,   /* Not-supported / deprecated */
  }
  try {
    const db = await mongoose.connect(process.env.DATABASE_URI, databaseOptions)
    // @ts-ignore
    connection.isConnected = db.connection._readyState;
  }
  catch (e) {
    console.log("Error Connecting to DB!: ", e)
    return
  }
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
