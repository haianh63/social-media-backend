import fs from "fs";
const deleteFile = (filePath) => {
  // Remove the file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
    }

    console.log(`File ${filePath} has been successfully removed.`);
  });
};

export default deleteFile;
