import multer from 'multer';
import multerConfig from '../config/multer';

const upload = multer(multerConfig).single('picture');

class PictureController {
  async store(req, res) {
    return upload(req, res, (err) => {
      if (err) {
        res.status(400).json({
          errors: [err.code],
        });
      }

      return res.json(res.file);
    });
  }
}

export default new PictureController();
