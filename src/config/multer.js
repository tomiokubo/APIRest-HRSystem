import multer from 'multer';
import { extname, resolve } from 'path';

const rand = () => Math.floor(Math.random() * 10_000 + 10_000);

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${rand()}${extname(file.originalname)}`);
    },
  }),
};
