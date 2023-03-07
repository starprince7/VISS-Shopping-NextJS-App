import mongoose from "mongoose";

interface ConnectionProp {
  isConnected: any;
}
type ConnectDb = () => Promise<void>;

const connection: ConnectionProp = { isConnected: null };

// Connect to Databse
const connectDB: ConnectDb = async () => {
  if (connection.isConnected !== null) {
    // eslint-disable-next-line no-console
    console.log("Database is already connected!...");
    return;
  }

  if (mongoose.connections.length > 0) {
    // @ts-expect-error
    // eslint-disable-next-line no-underscore-dangle
    connection.isConnected = mongoose.connections[0]._readyState;

    if (connection.isConnected === 1) {
      // console.log('Using previous connection...');
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
  };
  try {
    const db = await mongoose.connect(
      process.env.DATABASE_URI as string,
      databaseOptions,
    );
    // @ts-expect-error
    // eslint-disable-next-line no-underscore-dangle
    connection.isConnected = db.connection._readyState;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("Error Connecting to DB!: ", e);
  }
};

// Disconnect From Database
async function disconnectDB(): Promise<void> {
  if (
    connection.isConnected !== null &&
    process.env.NODE_ENV === "production"
  ) {
    await mongoose.disconnect();
    connection.isConnected = false;
  }
}

const db = { connectDB, disconnectDB };
export default db;
