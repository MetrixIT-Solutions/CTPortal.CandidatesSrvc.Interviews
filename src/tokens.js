/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
var jwt = require('jsonwebtoken');
var moment = require('moment');

var logger = require('./lib/logger');

'use strict';
var crypto = require('crypto');

const ENCRYPTION_KEY = config.criptoTokenKey; // process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

/**
 * Begin: refreshToken
 * @param {string} reqToken string
 * @param {object} res
 * @return {function} callback function
 */
const refreshToken = (reqToken, ip, res, callback) => {
  try {
    const currentDtNum = moment().valueOf();
    const jwtToken = decrypt(reqToken, ENCRYPTION_KEY);
    const tokenData = jwt.verify(jwtToken, config.jwtSecretKey);
    const exp = moment().add(config.webSsnExpr, config.webSsnExprType).valueOf();
    if(tokenData.exp >= currentDtNum) {
      getUserSsnData(tokenData, reqToken, exp, ip, (token, data) => {
        const newToken = token !== 'error' ? token : reqToken;
        const newTokenData = token !== 'error' ? tokenData : null;
        const isExpired = (token === 'NA');
        res.header('ctpeuatoken', newToken);
        callback({tokenData: newTokenData, isExpired, ctpeuatoken: newToken, data});
      });
    } else {
      res.header('ctpeuatoken', reqToken);
      callback({tokenData, isExpired: true, ctpeuatoken: reqToken});
    }
  } catch(error) {
    logger.error('src/tokens.js - refreshToken: Un-Known Error: ' + error);
    res.header('ctpeuatoken', reqToken);
    callback(null);
  }
}
// --- End: refreshToken

// --- Begin: userTokenDecode
const userTokenDecode = (reqToken) => {
  try {
    const currentDtNum = moment().valueOf();
    const jwtToken = decrypt(reqToken, ENCRYPTION_KEY);
    const tokenData = jwt.decode(jwtToken, config.jwtSecretKey);
    if(tokenData.exp >= currentDtNum) {
      return {tokenData, isExpired: false};
    } else {
      return {tokenData, isExpired: true};
    }
  } catch(error) {
    logger.error('src/tokens.js - userTokenDecode: Un-Known Error: ' + error);
    return null;
  }
}
// --- End: userTokenDecode

/**
 * @param {string} text string
 * @param {string} encryptKey string
 * @return {string}
 */
const encrypt = (text, encryptKey) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptKey), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * @param {string} text string
 * @param {string} decryptKey string
 * @return {string}
 */
const decrypt = (text, decryptKey) => {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(decryptKey), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  refreshToken, userTokenDecode, encrypt, decrypt
};

const getUserSsnData = (tokenData, reqToken, exp, ip, callback) => {
  const {getEuUserSsn, euUserSsnLogout} = require('./EuUserAuthsSrvc');
  // if (tokenData.ip == ip) {
    const sep = moment().add(5, 'minutes').valueOf();
    getEuUserSsn(reqToken, (err, resObj) => {
      if (resObj?.status == '200') {
        const payload = setTokenPayload(tokenData, {sep, exp});

        const jwtNewToken = jwt.sign(payload, config.jwtSecretKey);
        const token = encrypt(jwtNewToken, ENCRYPTION_KEY);
        callback(token, resObj?.resData?.result);
      } else if(err && err.response && err.response?.data?.status == '204') {
        callback('NA', null);
      } else {
        logger.error('src/tokens.js - getUserSsnData: ' + JSON.stringify(resObj));
        callback('error', null);
      }
    });
  // } else {
  //   euUserSsnLogout(reqToken, (err, resObj) => {
  //     callback('NA', null);
  //   });
  // }
}

const setTokenPayload = (tokenData, newData) => {
  const payload = {
    ...tokenData, ...newData
  };
  return payload;
}