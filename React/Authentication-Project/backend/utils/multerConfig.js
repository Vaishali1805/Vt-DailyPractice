import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload folders exist and create if not exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// Disk storage (for images, profileImage, etc.)
export const diskStorage = (folderName = 'uploads') =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const fullPath = path.join(folderName);
      ensureDir(fullPath);
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

// Memory storage (for chunked video uploads)
export const memoryStorage = multer.memoryStorage();

// Reusable multer instances
export const imageUploader = multer({ storage: diskStorage('uploads/images') });
export const profileUploader = multer({ storage: diskStorage('uploads/profiles') });
export const chunkUploader = multer({ storage: memoryStorage });
