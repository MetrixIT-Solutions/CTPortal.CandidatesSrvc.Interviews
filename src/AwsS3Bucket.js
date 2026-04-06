/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var fs = require('fs');
var { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
var { Upload } = require('@aws-sdk/lib-storage');
var path = require('path');
const config = require('config');

const logger = require('./lib/logger');

const s3Client = new S3Client({
  region: config.awsRegion,
  credentials: {
    accessKeyId: config.awsAccessKey,
    secretAccessKey: process.env[config.awsSecretKey],
  },
});

const awsS3Upload = async (id) => {
  try {
    const directoryPath = path.join(__dirname, `../assets/files/${id}`); // Ensure assets folder exists
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
    await uploadDirectory(directoryPath, config.awsBucketName);
    return true;
  } catch (error) {
    logger.error('awsS3Upload error:' + error);
    return false;
  }
};

const awsS3Delete = async (fileName) => {
  try {
    const params = {
      Bucket: config.awsBucketName,
      Key: fileName // e.g., "folder/file.jpg"
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    // console.log(`✅ Successfully deleted: ${key}`);
  } catch (error) {
    logger.error('Delete file error:' + error);
  }
};

module.exports = {
  awsS3Upload, awsS3Delete
}

const uploadDirectory = async (directoryPath, bucketName) => {
  const files = fs.readdirSync(directoryPath);

  const uploadPromises = files.map(async (file) => {
    const fullPath = path.join(directoryPath, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      return uploadDirectory(fullPath, bucketName); // Recursively upload subdirectories
    } else {
      return uploadFile(fullPath, bucketName);
    }
  });

  return Promise.all(uploadPromises);
};

// Function to upload a single file
const uploadFile = async (filePath, bucketName) => {
  const fileStream = fs.createReadStream(filePath);
  const key = path.relative(path.join(__dirname, '../assets/files/'), filePath).replace(/\\/g, '/'); // Fix Windows path
  const uploadParams = {
    Bucket: bucketName,
    Key: `interviews/${key}`,
    Body: fileStream,
    // ACL: 'public-read', // Set permissions as needed
  };

  const upload = new Upload({
    client: s3Client,
    params: uploadParams,
  });

  return upload.done();
};
