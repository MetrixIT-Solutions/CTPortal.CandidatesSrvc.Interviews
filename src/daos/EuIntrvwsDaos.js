/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../SetRes');
const B2BEuInterviews = require('../schemas/B2BEuInterviews');
const B2BEuInterviewsStsLcs = require('../schemas/B2BEuInterviewsStsLcs');
const logger = require('../lib/logger');
const { uniq } = require('../consts/EuIntrvwsConsts.json');

const getEuIntrvwsList = (query, body, callback) => {
  const { pgNum, limit } = body;
  let resultObj = { intrvwsListCount: 0, intrvwsList: [] };
  B2BEuInterviews.find(query).skip((pgNum - 1) * limit).limit(limit).sort({ cDtStr: -1 }).then((resObj) => {
    if (resObj && resObj.length > 0) {
      intrvwsTotalCount(query, resObj, callback);
    } else {
      const noData = SetRes.noData(resultObj);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwsDaos.js, at getEuIntrvwsList:' + error);
    const err = SetRes.unKnownErr(resultObj);
    callback(err);
  });
}

const IntrvwsAggregateQuery = (query, callback) => {
  B2BEuInterviews.aggregate(query).then((resObj) => {
    if (resObj && resObj.length > 0) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData([]);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwsDaos.js, at IntrvwsAggregateQuery:' + error);
    const err = SetRes.unKnownErr([]);
    callback(err);
  });
}

const postEuIntrvwCreate = (createObj, callback) => {
  createObj.save().then((resObj) => {
    if (resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const sf = SetRes.createFailed({});
      callback(sf);
    }
  }).catch((error) => {
    if (error.keyPattern && error.keyPattern.intrwId) {
      logger.error('Uniqueness(intrwId) Error in daos/EuIntrvwsDaos.js, at postEuIntrvwCreate:' + error);
      const err = SetRes.uniqueErr(uniq.intrwId);
      callback(err);
    } else {
      logger.error('Un-known Error in daos/EuIntrvwsDaos.js, at postEuIntrvwCreate:' + error);
      const err = SetRes.unKnownErr({});
      callback(err);
    }
  });
}

const getEuIntrvwView = (query, callback) => {
  B2BEuInterviews.findOne(query).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData({});
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bEuSubmsnsDaos.js, at getEuIntrvwView:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

const putEuIntrvwUpdate = (query, updateObj, callback) => {
  B2BEuInterviews.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.updateFailed({});
      callback(uf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwsDaos.js, at putEuIntrvwUpdate:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  })
}

const getEuIntrvwStsLfc = (query, callback) => {
  B2BEuInterviewsStsLcs.find(query).sort({cDtStr: -1}).then((resObj) => {
    if (resObj && resObj.length > 0) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData([]);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwsDaos.js, at getEuIntrvwStsLfc:' + error);
    const err = SetRes.unKnownErr([]);
    callback(err);
  });
}

const profileIntrvwUpdate = (query, updateObj, callback) => {
  B2BEuInterviews.updateMany(query, updateObj, { new: true }).then((resObj) => {            
    if (resObj) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.updateFailed([]);
      callback(uf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwsDaos.js, at profileIntrvwUpdate:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  })
}

module.exports = {
  getEuIntrvwsList, IntrvwsAggregateQuery, postEuIntrvwCreate, getEuIntrvwView, putEuIntrvwUpdate,
  getEuIntrvwStsLfc, profileIntrvwUpdate
};

const intrvwsTotalCount = (query, resObj, callback) => {
  let resultObj = { intrvwsListCount: resObj.length, intrvwsList: resObj };
  B2BEuInterviews.countDocuments(query).then((resultCount) => {
    if (resultCount) {
      resultObj = { intrvwsListCount: resultCount, intrvwsList: resObj };
      const result = SetRes.successRes(resultObj);
      callback(result);
    } else {
      const result = SetRes.successRes(resultObj);
      callback(result);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/EuIntrvwsDaos.js, at intrvwsTotalCount:' + error);
    const result = SetRes.successRes(resultObj);
    callback(result);
  });
}
