import busboy from 'busboy';
import { Request, Response } from 'express';
import { fileBucket } from '/'

export async function getFileById(req: Request, res: Response) {
 //to do implement
}

export async function uploadFile(req: Request, res: Response) {
  const bb = busboy({ headers: req.headers });
  req.pipe(bb);

  bb.on('file', (_, file, info) => {
    const { filename, mimeType } = info;

    const uploadStream = fileBucket
      .openUploadStream(filename, { contentType: mimeType })
      .on('finish', (data: mongoose.mongo.GridFSFile) => {
        res.status(201).json(data._id);
      });

    const resizer = sharp().resize(1080).jpeg({ quality: 90 }).grayscale();

    file.pipe(resizer).pipe(uploadStream);
  });
}

 export async function deleteFileById(req: Request, res: Response) {
  //to do implement
 }