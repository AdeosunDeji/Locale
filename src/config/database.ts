import mongoose from "mongoose";
import config from "./index";

const dbOptions = {
  connectTimeoutMS: 10000,
  // Other database connection options...
};

const connect = async () => {
  const connection = await mongoose.connect(config.MONGO_URL as string, dbOptions);
  if (!connection) {
    console.log("DATABASE connection failed! Exiting Now");
    process.emit("SIGTERM");
    process.exit(1);
  }
  console.log("DATABASE connected successfully!");
  return connection;
};

export default { connect };
