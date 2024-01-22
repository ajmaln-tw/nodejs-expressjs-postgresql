import multer from 'multer';
import path from 'path';

export const storage: any = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExt = path.extname(file.originalname);
        const fileName = file.fieldname + '-' + uniqueSuffix + fileExt;
        cb(null, fileName);
    },
});


export const upload = multer({ storage: storage });