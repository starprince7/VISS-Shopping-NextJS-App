import mongoose, { Connection, ConnectOptions } from "mongoose";

interface IConnection {
  isConnected: boolean;
}

interface IDatabaseConnection {
  connection: IConnection;
  start(): Promise<void>;
  end(): Promise<void>;
}

class DatabaseConnection implements IDatabaseConnection {
  private static instance: DatabaseConnection;

  public connection: IConnection;

  private constructor() {
    // Initialize connection status
    this.connection = { isConnected: false };
  }

  public static getInstance(): DatabaseConnection {
    // Check if an instance already exists
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection(); // Create a new instance if none exists
    }
    return DatabaseConnection.instance; // Always return the instance
  }

  // Start the database connection
  public async start(): Promise<void> {
    if (!process.env.DATABASE_URI) {
      throw new Error("DatabaseConnection Connection URI env is missing.");
    }
    // Check if the database is already connected
    if (this.connection.isConnected) {
      console.log("DB CONNECTION ALREADY ESTABLISHED.");
      return;
    }

    const databaseOptions: ConnectOptions = {
      autoIndex: true,
    };

    try {
      // eslint-disable-next-line no-console
      console.log("DATABASE CONNECTION STARTING...");
      const db: mongoose.Connection = (
        await mongoose.connect(process.env.DATABASE_URI, databaseOptions)
      ).connection;
      // eslint-disable-next-line no-console
      console.log("CONNECTED TO DATABASE!");
      // @ts-expect-error
      // eslint-disable-next-line no-underscore-dangle
      this.connection.isConnected = db.readyState === 1; // Check if connected
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("FAILED TO ESTABLISH A DATABASE CONNECTION: ", e);
    }
  }

  // End the database connection
  public async end(): Promise<void> {
    if (this.connection.isConnected) {
      await mongoose.disconnect();
      this.connection.isConnected = false;
    }
  }
}

// Exporting the singleton instance
const db = DatabaseConnection.getInstance();
export { db, DatabaseConnection };
