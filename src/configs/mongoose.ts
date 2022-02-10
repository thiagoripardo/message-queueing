import mongoose, { Mongoose } from "mongoose";

let cachedDb: Mongoose;

export default function mongooseConnetion() {
  if (cachedDb && cachedDb.connection.readyState) {
    return Promise.resolve(cachedDb);
  }

  return mongoose
    .connect(`${process.env.MONGODB_URL}`, {
      dbName: `${process.env.MONGODB_DATABASE_NAME}`,
    })
    .then((client: Mongoose) => {
      cachedDb = client;
      return cachedDb;
    });
}
