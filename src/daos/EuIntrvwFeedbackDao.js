/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const B2BEuInterviewFeedbacks = require('../schemas/B2BEuInterviewFeedbacks');
const logger = require('../lib/logger');
const SetRes = require('../SetRes');

const getEusrItrvwFeedbkList = (query, pgNum, callback) => {
  let resultObj = { fbCount: 0, fbList: [] };
  B2BEuInterviewFeedbacks.find(query).skip((pgNum - 1) * 50).limit(50).sort({cDtStr: -1}).then((resArr) => {
    if (resArr && resArr.length > 0) {
      resultObj = { fbCount: resArr.length, fbList: resArr };
      const result = SetRes.successRes(resultObj);
      callback(result);
    } else {
      const noData = SetRes.noData(resultObj);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwFeedbackDao.js, at getEusrItrvwFeedbkList:' + error);
    const err = SetRes.unKnownErr(resultObj);
    callback(err);
  });
}

const postEuItrvwFeedBkCreate = (createObj, callback) => {
  createObj.save().then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const sf = SetRes.createFailed({});
      callback(sf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwFeedbackDao. js, at postEuItrvwFeedBkCreate:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

const getEuItrvwFeedback = (query, callback) => {
  B2BEuInterviewFeedbacks.findOne(query).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData({});
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwFeedbackDao.js, at getEuItrvwFeedback:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

const putEuItrvwFeedBkUpdate = (query, updateObj, callback) => {
  B2BEuInterviewFeedbacks.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData({});
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwFeedbackDao.js, at getEuItrvwFeedback:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

module.exports = {
  getEusrItrvwFeedbkList, postEuItrvwFeedBkCreate, getEuItrvwFeedback, putEuItrvwFeedBkUpdate
};
