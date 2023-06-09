import busboy from 'busboy';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import sharp from 'sharp';
import { fileBucket } from '../models/fileModel';

export async function getFileById(req: Request, res: Response) {
  try {
    if (!req.params.id) return res.json('File not found');
    const _id = new mongoose.mongo.ObjectId(req.params.id);

    const file = await fileBucket.find({ _id }).next();

    if (!file?.contentType) {
      return res.status(404).json('File not found');
    }
    res.setHeader('Content-Type', file.contentType);
    // res.setHeader('Content-Disposition', `attachment; filename=${file.filename}`);
    const downloadStream = fileBucket.openDownloadStream(_id);
    downloadStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
}



export async function uploadFile(req: Request, res: Response) {
  try {
    const bb = busboy({ headers: req.headers });
    req.pipe(bb);

    bb.on('file', (_, file, info) => {
      const { filename, mimeType } = info;

      const uploadStream = fileBucket
        .openUploadStream(filename, { contentType: mimeType })
        .on('finish', (data: mongoose.mongo.GridFSFile) => {
          res.status(201).json(data._id);
        });

      const resizer = sharp().resize(1080).jpeg({ quality: 90 });

      file.pipe(resizer).pipe(uploadStream);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
}


 export async function deleteFileById(req: Request, res: Response) {
  //to do implement
 }