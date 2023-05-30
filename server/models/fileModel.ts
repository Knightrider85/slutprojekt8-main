import mongoose from "mongoose";

export const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
  bucketName: "files",
});