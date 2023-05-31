import express from "express";
import { deleteFileById, getFileById, uploadFile } from "../controllers/fileController";

export const fileRouter = express.Router();

fileRouter.get("/api/file/:id", getFileById);
fileRouter.post("/api/files", uploadFile);
fileRouter.delete("/api/file/id", deleteFileById);