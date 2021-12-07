import cloudinary from './config';

export const uploadFile = (file, carpet) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream({ folder: `users/${carpet}/profile` }, (err, res) => {
        if (err) return reject(err);
        else {
          return resolve(res.url);
        }
      })
      .end(file.buffer);
  });
};
