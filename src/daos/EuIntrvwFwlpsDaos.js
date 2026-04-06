/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../SetRes');
const logger = require('../lib/logger');
const B2BEuInterviewFollowups = require('../schemas/B2BEuInterviewFollowups');

const commonCreateFunc = (crtObj, callback) => {
  crtObj.save().then((resObj) => {    
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const sf = SetRes.createFailed(resObj);
      callback(sf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwFwlpsDaos.js, at commonCreateFunc:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  })
}

const euIntrvwFwlsList = (query, callback) => {
  B2BEuInterviewFollowups.find(query).sort({cDtStr: -1}).then((resObj) => {    
    if (resObj && resObj.length > 0){
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const result = SetRes.noData([]);
      callback(result);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwFwlpsDaos.js, at euIntrvwFwlsList:' + error);
    const uke = SetRes.unKnownErr(resultObj);
    callback(uke);
  })
}

const euIntrvwFwlsUpdate = (query, updateObj, callback) => {
  B2BEuInterviewFollowups.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const result = SetRes.updateFailed({});
      callback(result);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwFwlpsDaos.js, at euIntrvwFwlsUpdate:' + error);
    const uke = SetRes.unKnownErr(resultObj);
    callback(uke);
  })
}

module.exports = {
  commonCreateFunc, euIntrvwFwlsList, euIntrvwFwlsUpdate
};
