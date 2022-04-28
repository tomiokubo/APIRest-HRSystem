import multer from 'multer';
import multerConfig from '../config/multer';
import Picture from '../models/Picture';

const upload = multer(multerConfig).single('picture');

class PictureController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        res.status(400).json({
          errors: [err.code],
        });
      }
      const original_name = req.file.originalname;
      const file_name = req.file.filename;
      const { worker_id } = req.body;
      const picture = await Picture.create({ original_name, file_name, worker_id });

      return res.json(picture);
    });
  }
}

export default new PictureController();
