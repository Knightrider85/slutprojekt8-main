import busboy from 'busboy';
import { Request, Response } from 'express';

export async function getFileById(req: Request, res: Response) {
 //to do implement
}

export async function uploadFile(req: Request, res: Response) {
  const bb = busboy({ headers: req.headers });
  req.pipe(bb);

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log('NEW FILE', { name, filename, encoding, mimeType });
  });
 }

 export async function deleteFileById(req: Request, res: Response) {
  //to do implement
 }