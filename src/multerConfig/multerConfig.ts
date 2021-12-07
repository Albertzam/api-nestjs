import * as multer from 'multer';
import { diskStorage } from 'multer';
import path from 'path';
const storage = diskStorage({
  destination: './upload/prueba',
  filename: (req, file, cb) => {
    const filename: string = file.filename;
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('jpeg') ||
    file.mimetype.includes('png') ||
    file.mimetype.includes('jpg')
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default storage;
