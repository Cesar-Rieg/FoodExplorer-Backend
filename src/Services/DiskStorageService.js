const fs = require("fs");
const path = require("path");
const UploadDeImagemConfig = require("../Configurations/UploadDeImagem.js");

class DiskStorage {
  async SalvarImagemAsync(file) {
    await fs.promises.rename(
      path.resolve(UploadDeImagemConfig.TEMP_FOLDER, file),
      path.resolve(UploadDeImagemConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async DeletarImagemAsync(file) {
    const filePath = path.resolve(UploadDeImagemConfig.UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath);
    } 
    catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
