import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = uuidv4();
      const extension = extname(file.originalname);
      cb(null, uniqueSuffix + extension);
    }
  });
  
  const upload = multer({ storage: storage });
  
  export default upload

