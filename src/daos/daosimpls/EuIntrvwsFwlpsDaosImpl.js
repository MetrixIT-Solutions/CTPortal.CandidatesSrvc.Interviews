/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const { v4: uuidv4 } = require('uuid');
const cs = require('../../services/CommonSrvc');
const B2BEuInterviewFollowups = require('../../schemas/B2BEuInterviewFollowups');
const { uType, uniq } = require('../../consts/EuIntrvwsConsts.json');

const euIntrvwFwlsCreate = (reqBody, tData) => {
  const data = setIntrvwFwlsData(reqBody, tData);
  const setData = new B2BEuInterviewFollowups(data);
  return setData;
}

const getQuery = (intrwId, tData) => {  
  return { intrw: intrwId, b2b: tData.b2b, delFlag: false };
}

const euIntrvwFwlsUpdate = (_id, reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const query = { _id, delFlag: false, b2b: tData.b2b };

  const updateObj = {
    notes: reqBody.notes,

    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };

  return { query, updateObj };
}
module.exports = {
  euIntrvwFwlsCreate, getQuery, euIntrvwFwlsUpdate
};

const setIntrvwFwlsData = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();

  const cCode = reqBody.countryCode ? reqBody.countryCode : '';
  const sCode = reqBody.stateCode ? reqBody.stateCode : '';
  return {
    _id: uuidv4(),

    idSeq: {
      seq: cCode + sCode + curUtc.currUTCYear + curUtc.currUTCMnt + curUtc.currUTCDay,
      cCode, sCode,
      year: curUtc.currUTCYear,
      month: curUtc.currUTCMnt,
      day: curUtc.currUTCDay
    },

    intrw: reqBody.intrw,
    intrwId: reqBody.intrwId || uniq.intrwId,
    cUId: tData.uid,
    euUser: reqBody.euUser,
    euName: reqBody.euName,
    submission: reqBody.submission,
    subId: reqBody.subId,
    b2b: tData.b2b,
    b2bName: tData.bn,
    b2bCode: tData.bc,

    // org: reqBody.org || '',
    // orgName: reqBody.orgName || '',
    // orgCode: reqBody.orgCode || '',
    // obId: reqBody.obId || '',
    // obName: reqBody.obName || '',
    // obCode: reqBody.obCode || '',
    // team: reqBody.team || '',
    // tName: reqBody.tName || '',
    // tCode: reqBody.tCode || '',

    notes: reqBody.notes,

    cuType: uType,
    cUser: tData.iss,
    cuName: tData.fn + ' ' + tData.ln,
    cDate: curUtc.currUTCDtTm,
    cDtStr: curUtc.currUTCDtTmStr,
    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };
}