const awsService = require("../Service/awsService");

const uploadFile = async (req, res) => {
   const { filePath, bucketName, keyName } = req.body;

   try {
      const result = await awsService.uploadFile(filePath, bucketName, keyName);
      res.status(200).json(result);
   } catch (err) {
      res.status(500).json({ success: false, message: err.message });
   }
};

const downloadFile = async (req, res) => {
   const { filePath, bucketName, keyName } = req.body;

   try {
      const result = await awsService.downloadFile(
         filePath,
         bucketName,
         keyName
      );
      res.status(200).json(result);
   } catch (err) {
      res.status(500).json({ success: false, message: err.message });
   }
};

module.exports = {
   uploadFile,
   downloadFile,
};
