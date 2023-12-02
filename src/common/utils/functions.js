const path = require("path");
const fs = require("fs");

const deleteFile = (filename) => {
  const pathFile = path.join(process.cwd(), "public", "upload");
  if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
};

module.exports = {
  deleteFile,
};
