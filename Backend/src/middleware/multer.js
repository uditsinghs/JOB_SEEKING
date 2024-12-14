import multer from "multer";
import path from "path";

// Define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); 
  },
});



// Multer configuration
const upload = multer({
  storage
});

export default upload;
