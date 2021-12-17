const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const BUCKET_NAME = process.env.FILE_UPLOAD_BUCKET_NAME;

module.exports.handler = async (event) => {
  console.log(event);
  const response = {
    isBase64Encoded: false,
    status: 200,
  };
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: decodeURIComponent(event.pathParameters.fileKey),
    };
    const data = await s3.getObject(params).promise();
    response.body = JSON.stringify({
      message: "Successfully retrieve file from s3.",
      data,
    });
  } catch (e) {
    console.error(e);
    response.body = JSON.stringify({
      message: "Failed to get file.",
      errorMessage: e,
    });
    response.status = 500;
  }
  return response;
};
