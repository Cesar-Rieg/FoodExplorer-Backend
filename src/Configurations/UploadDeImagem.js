const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const GuidExtensions = require("../Extensions/GuidExtensions.js");

const TEMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TEMP_FOLDER, "Uploads");

const MULTER = {
  storage: multer.diskStorage({
    destination: TEMP_FOLDER,
    filename(request, file, callback) {
      let _guidExtensions = new GuidExtensions();
      let imagemId = _guidExtensions.NewGuid();
      let fileHash = crypto.randomBytes(10).toString("hex"); // Obsoleto
      const fileName = `${imagemId}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TEMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
};
