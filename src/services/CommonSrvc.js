/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
var moment = require('moment');
var {rimraf} = require('rimraf');

'use strict';
var crypto = require('crypto');

const logger = require('../lib/logger');

/**
 * Begin genSalt: Code to Generate Salt.
 * @param {Number} length, length of salt.
 * @param {function} callback is a callback function.
 */
const genSalt = (length) => {
  try {
    return (crypto.randomBytes(Math.ceil(length/2))
      .toString('hex') // convert to hexadecimal format
      .slice(0, length)); // return required number of characters
  } catch(error) {
    logger.error('Un-Known Error in services/CommonSrvc.js, at genSalt:' + error);
    return config.mySalt;
  }
}
// --- End genSalt: Salt Generation Code.

/**
 * Begin encryptStr: String Encryption Code.
 * @param {String} gStr, Given String.
 * @param {String} salt to encryption.
 * @param {function} callback, is a callback function
 */
const encryptStr = (gStr, salt) => {
  try {
    var hash = crypto.createHmac('sha512', salt); // Hashing algorithm sha512
    hash.update(gStr);
    var strHash = hash.digest('hex');
    return {salt, strHash};
  } catch(error) {
    logger.error('Un-Known Error in services/CommonSrvc.js, at encryptStr:' + error);
    return {salt, strHash: ''};
  }
}
// --- End encryptStr: Pasword Encryption Code.

const currUTCObj = () => {
  const utcMoment = moment.utc();
  const currUTCDtTmStr = utcMoment.format('YYYY-MM-DD HH:mm:ss');
  const currUTCDtTmNum = moment(currUTCDtTmStr, 'YYYY-MM-DD HH:mm:ss').valueOf();
  const currUTCDtTm = new Date(currUTCDtTmStr);
  const currUTCYear = utcMoment.year();
  const currUTCMnt = utcMoment.format('MM');
  const currUTCDay = utcMoment.format('DD');
  const currUTCDayOfYear = utcMoment.dayOfYear();
  const currHrs = parseInt(utcMoment.format('HH')) * 60 * 60;
  const currMin = parseInt(utcMoment.format('mm')) * 60;
  const currSec = parseInt(utcMoment.format('ss'));
  const time = (currHrs + currMin + currSec).toString();
  return {currUTCDtTmStr, currUTCDtTmNum, currUTCDtTm, currUTCYear, currUTCMnt, currUTCDay, currUTCDayOfYear, time};
}

const isJsonEmpty = (obj) => {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

// --- Delete Folder === //
const dltFolder = (filesPath) => {
  if (filesPath && filesPath.length > 0) {
    var folder = filesPath[0].destination || '';
    rimraf(folder, {}, () => { });
  }
}

// --- Random String Generation --- //
const randomStrGen = (str, size) => {
  var result = '';
  for (let i = size; i > 0; --i) result += str[Math.floor(Math.random() * str.length)];
  return result;
}

const getCurrNum = () => {
  const utcMoment = moment.utc();
  const currYear = (parseInt(utcMoment.format('YYYY')) - 2023).toString();
  const dayOfYear = (utcMoment.dayOfYear()).toString();
  const currHrs = parseInt(utcMoment.format('HH')) * 60 * 60;
  const currMin = parseInt(utcMoment.format('mm')) * 60;
  const currSec = parseInt(utcMoment.format('ss'));
  const time = (currHrs + currMin + currSec).toString();

  const currNum = currYear + dayOfYear + time;
  return currNum;
}

module.exports = {
  genSalt, encryptStr, currUTCObj, isJsonEmpty, dltFolder, randomStrGen, getCurrNum
};
