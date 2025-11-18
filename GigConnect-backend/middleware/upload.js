import multer from "multer";
import path from "path";

// where to save the uploaded files
const storage = multer.diskStorage({
  destination: "./uploads", // folder in your backend
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({ storage });

export default upload;
