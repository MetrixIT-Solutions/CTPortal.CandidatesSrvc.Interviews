/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var { v4: uuidv4 } = require('uuid');

const eitFeedBack = require('../../schemas/B2BEuInterviewFeedbacks');
const { uType } = require('../../consts/EuIntrvwsConsts.json');
const cs = require('../../services/CommonSrvc');

const euItFbQry = (intrw, b2b) => {
  return {delFlag: false, intrw, b2b};
}

const b2bItrvwFeedBkData = (reqBody, tData) => {
  const data = setIntrvwFbkData(reqBody, tData);
  return new eitFeedBack(data);
}
const updateIntrvwFeedback = (reqBody, intObj, tData) => {
  const curUtc = cs.currUTCObj();
  const query = {_id: reqBody.intrw};
  let updateObj = {
    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };
  if(intObj?._id && reqBody?.oldIfNotes) {
    const fbArr = intObj.feedback;
    const index = fbArr.findIndex(fb => fb === reqBody.oldIfNotes);
    if(index > -1) {
      fbArr[index] = reqBody.ifNotes;
      updateObj = {feedback: fbArr, ...updateObj};
    } else {updateObj = {$set: updateObj, $push: {feedback: reqBody.ifNotes}};}
  } else {
    updateObj = {$set: updateObj, $push: {feedback: reqBody.ifNotes}};
  }
  return {query, updateObj};
}

const intrvwFbUObj = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  return setCommonData(reqBody, tData, curUtc);
}

const getFbQry = (_id, b2b) => {
  return {delFlag: false, _id, b2b};
}
module.exports = {
  euItFbQry, b2bItrvwFeedBkData, updateIntrvwFeedback, intrvwFbUObj, getFbQry
}

const setIntrvwFbkData = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const cd = setCommonData(reqBody, tData, curUtc);
  return {
    _id: uuidv4(),

    idSeq: {
      seq: curUtc.currUTCYear + curUtc.currUTCMnt + curUtc.currUTCDay,
      year: curUtc.currUTCYear,
      month: curUtc.currUTCMnt,
      day: curUtc.currUTCDay
    },

    intrw: reqBody.intrw,
    intrwId: reqBody.intrwId,
    euUser: tData.iss,
    euName: tData.fn + ' ' + tData.ln,
    submission: reqBody.submission,
    subId: reqBody.subId,
    b2b: tData.b2b,
    b2bName: tData.bn,
    b2bCode: tData.bc,

    org: tData.org,
    orgName: tData.on,
    orgCode: tData.oc,
    // obId: tData.bc,
    // obName: tData.obName,
    // obCode: tData.obCode,
    // team: tData.ot,
    // tName: tData.otn,cData
    // tCode: tData.otc,

    process: reqBody.process,
    duration: reqBody.duration,
    canName: reqBody.canName,
    canPhNum: reqBody.canPhNum,
    jobId: reqBody.jobId,
    jobTitle: reqBody.jobTitle,
    jobDesc: reqBody.jobDesc,
    skills: reqBody.skills,
    panelMembers: reqBody.panelMembers,
    testCompany: reqBody.testCompany,
    ifPath: reqBody.ifPath,
    ...cd,
  
    cuType: uType,
    cUser: tData.iss,
    cuName: tData.fn + ' ' + tData.ln,
    cDate: curUtc.currUTCDtTm,
    cDtStr: curUtc.currUTCDtTmStr,
  };
}

const setCommonData = (reqBody, tData, curUtc) => {
  const test = reqBody.testScore ? {
    testScore: reqBody.testScore,
    testStatus: reqBody.testStatus,
    testNotify: reqBody.testNotify,
    testNotes: reqBody.testNotes,
  } : {};
  return {
    ...test,
   
    qus: reqBody.qus,
    ifNotes: reqBody.ifNotes,
    intrwStatus: reqBody.intrwStatus,
    intrwTyEmail: reqBody.intrwTyEmail,
    intrwNotes: reqBody.intrwNotes,
    intrwdBy: reqBody.intrwdBy,

    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  }
}
