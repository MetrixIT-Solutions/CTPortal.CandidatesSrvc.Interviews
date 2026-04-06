/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var { v4: uuidv4 } = require('uuid');

const cs = require('../../services/CommonSrvc');
const { uType } = require('../../consts/EuIntrvwsConsts.json');
const b2bEuInterviews = require('../../schemas/B2BEuInterviews');
const b2bEuInterviewsLcs = require('../../schemas/B2BEuInterviewsLcs');
const B2BEuInterviewsStsLcs = require('../../schemas/B2BEuInterviewsStsLcs');
const config = require('config');

const euIntrvwsListQuery = (reqBody, tData) => {
  return setListQuery(reqBody, tData);
}

const euIntrvwCreateQuery = (ifPath, reqBody, tData) => {
  const cObj = setCreateIntrvwData(ifPath, reqBody, tData);
  const createObj = new b2bEuInterviews(cObj);
  const lcObj = { ...cObj, intrw: cObj._id };
  const lfycObj = new b2bEuInterviewsLcs(lcObj);
  return { createObj, lfycObj };
}

const euIntrvwViewQuery = (_id, tData) => {
  return { delFlag: false, _id, b2b: tData.b2b }
}

const putEuIntrvwUpdateObj = (ifPathD, reqBody, tData) => {
  const ifPath = ifPathD ? {ifPath: ifPathD} : !reqBody.iconPath ? {ifPath: ''} : {};
  return setIntrvwUpdateData(ifPath, reqBody, tData);
}

const intrwStsLcData =(body, tData) => {
  const data = setIntrwStsLcData(body, tData);
  return new B2BEuInterviewsStsLcs(data);
}

const euIntwStsLfcQry = (intrw, tData) => {
  return {delFlag: false, intrw, b2b: tData.b2b};
}

const putIntrvwDataUpdate = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();

  const query = {euUser: reqBody._id, b2b: tData.b2b, delFlag: false };

  const updtObj = {
    euName: reqBody.name,
    // euPrimary: reqBody.myPrimary,
    canName: reqBody.name,
    // canEmail: reqBody.emID,
    canPhNum: reqBody.mobCcNum,

    uuType: uType,
    uUser:  tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate:  curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };

  return { query, updtObj };
}

const setPrtQuery = (_id, reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const query = { _id, b2b: tData.b2b, euUser: tData.iss, delFlag: false };
  const setPrtObj = {
    priority: reqBody.priority,
    uuType: uType, uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  }
  return { query, setPrtObj };
}

const updateInvStatus = (reqBody, prfPath, tData) => {
  const curUtc = cs.currUTCObj();
  const iSchedules = reqBody.status == 'Scheduled' ? {iSchedules: reqBody.iSchedules} : {};
  return {
    iStatus: reqBody.status,
    process: reqBody.process,
    invWith: reqBody.invWith,
    round: reqBody.round,
    isDt: reqBody.isDt,
    isDtStr: reqBody.isDtStr,
    iTz: reqBody.iTz,
    isNotes: reqBody.iNotes,
    duration: reqBody.duration,
    isVrfd: reqBody.isVrfd,
    ...prfPath,
    ...iSchedules,
    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };
}

const intrvwData = (reqBody, tData) => {
  const data = setItrvwLfcData(reqBody, tData);
  return new b2bEuInterviewsLcs(data);
}

module.exports = {
  euIntrvwsListQuery, euIntrvwCreateQuery, euIntrvwViewQuery, putEuIntrvwUpdateObj, intrwStsLcData, 
  euIntwStsLfcQry, putIntrvwDataUpdate, setPrtQuery, updateInvStatus, intrvwData
}

const setListQuery = (reqBody, tData) => {
  const searchStr = reqBody.searchStr || '';
  const status = reqBody.status && reqBody.status.length ? { iStatus: { $in: reqBody.status } } : {};
  const matchQuery = {
    delFlag: false,
    euUser: tData.iss,
    b2b: tData.b2b,
    ...status,
    $or: [
      { 'euName': { $regex: searchStr, $options: 'i' } },
      { 'canName': { $regex: searchStr, $options: 'i' } },
      { 'canPhNum': { $regex: searchStr, $options: 'i' } },
      { 'jobTitle': { $regex: searchStr, $options: 'i' } },
      { 'vName': { $regex: searchStr, $options: 'i' } },
      { 'euSubId': { $regex: searchStr, $options: 'i' } },
      { 'intrwId': { $regex: searchStr, $options: 'i' } }
    ]
  };
  var countQuery = [
    {
      $match: { delFlag: false, euUser: tData.iss, b2b: tData.b2b }
    },
    { $group: { _id: '$iStatus', count: { $sum: 1 } } }
  ]
  return { matchQuery, countQuery };
}

const setCreateIntrvwData = (ifPath, reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const year = curUtc.currUTCYear - (curUtc.currUTCYear - 1);
  const day = curUtc.currUTCDayOfYear;
  const cuTmInScnds = curUtc.time;
  const intrwId = tData.fn.charAt(0) + tData.ln.charAt(0) + year + day + 'I' + cuTmInScnds;
  return {
    _id: uuidv4(),
    idSeq: {
      seq: curUtc.currUTCYear + curUtc.currUTCMnt + curUtc.currUTCDay,
      year: curUtc.currUTCYear,
      month: curUtc.currUTCMnt,
      day: curUtc.currUTCDay
    },
    euUser: tData.iss,
    euName: tData.fn + ' ' + tData.ln,
    euPrimary: tData.mp,
    euRefID: tData.uid,
    lead: reqBody.lead,
    leadId: reqBody.leadId,
    submission: reqBody.submission,
    subId: reqBody.subId,
    b2b: tData.b2b,
    b2bName: tData.bn,
    b2bCode: tData.bc,

    org:  tData.org,
    orgName: tData.on,
    orgCode: tData.oc,
    obId: reqBody.obId || '',
    obName: reqBody.obName || '',
    obCode: reqBody.obCode || '',
    team: tData.ot || '',
    tName: tData.otn || '',
    tCode: tData.otc || '',

    b2bUser: reqBody.b2bUser,
    b2buName: reqBody.b2buName,
    b2buRole: reqBody.b2buRole,
    b2bUsers: reqBody.b2bUsers,

    pReports: reqBody.pReports || [],

    iSchedules: [{
      _id: reqBody.round,
      process: reqBody.process,
      invWith: reqBody.invWith,
      round: reqBody.round,
      isDt: reqBody.isDt,
      isDtStr: reqBody.isDtStr,
      iTz: reqBody.iTz,
      duration: reqBody.duration,
    }],

    process: reqBody.process,
    invWith: reqBody.invWith,
    round: reqBody.round,
    isDt: reqBody.isDt,
    isDtStr: reqBody.isDtStr,
    iTz: reqBody.iTz,
    duration: reqBody.duration,
    canName: tData.fn + ' ' + tData.ln,
    canPhNum: tData.mn,
    canEmail: tData.eid,
    jobTitle: reqBody.jobTitle,
    jobId: reqBody.jobId || '',
    jobDesc: reqBody.jobDesc || '',
    skills: reqBody.skills,

    iStatus: reqBody.iStatus,
    isNotes: reqBody.isNotes || '',
    jobLoc: reqBody.city,

    vType: reqBody.vType,
    vName: reqBody.vName,
    vCode: reqBody.vCode || '',
    vcPerson: reqBody.vcPerson,
    vcMobCc: reqBody.vcMobCc,
    vcMobNum: reqBody.vcMobNum,
    vcMobCcNum: reqBody.vcMobCcNum,
    vcEmail: reqBody.vcEmail,
    vClient: reqBody.vClient || '',
    pvipType: reqBody.pvipType || '',
    pvipName: reqBody.pvipName || '',
    pvipcPerson: reqBody.pvipcPerson || '',
    pvipcMobCc: reqBody.pvipcMobCc || '',
    pvipcMobNum: reqBody.pvipcMobNum || '',
    pvipcMobCcNum: reqBody.pvipcMobCcNum || '',
    pvipcEmail: reqBody.pvipcEmail || '',

    intrwId,
    panelMembers: reqBody.panelMembers || '',
    testCompany: reqBody.testCompany || '',
    ifPath,

    prHr: reqBody.prHr || '',
    prNotes: reqBody.prNotes || '',
    prfPath: reqBody.prfPath || '',

    visaStatus: reqBody.visaStatus || '',
    tExp: reqBody.tExp || '',
    primSkills: reqBody.primSkills || '',
    wrkUrls: reqBody.wrkUrls || [],
    wrkAuthExpDtStr: reqBody.wrkAuthExpDtStr || '',
    usaNatID: reqBody.usaNatID || '',
    unidType: reqBody.unidType || '',
    unidExpDtStr: reqBody.unidExpDtStr || '',
    resState: reqBody.resState || '',
    resScode: reqBody.resScode || '',
    certificates: reqBody. certificates || [],

    hNum: reqBody.hNum || '',
    area: reqBody.area || '',
    zip: reqBody.zip || '',
    state: reqBody.state,
    sCode: reqBody.sCode,
    city: reqBody.city,
    cityCode: reqBody.cityCode || '',
    country: reqBody.country,
    cCode: reqBody.cCode,

    mVisaStatus: reqBody.mVisaStatus || '',  
    mEmail: reqBody.mEmail || '',
    mMobCc: reqBody.mMobCc || '',
    mMobNum: reqBody.mMobNum || '',
    mTexp: reqBody.mTexp || 0,
    mPrimSkills: reqBody.mPrimSkills || '',
    mCurrClient: reqBody.mCurrClient || '',
    mPrevClient: reqBody.mPrevClient || '',
    mWrkUrls: reqBody.mWrkUrls || [],
    mWrkAuthExpDtStr: reqBody.mWrkAuthExpDtStr || '',
    mUsaNatID: reqBody.mUsaNatID || '', 
    mUnidType: reqBody.mUnidType || '',
    mUnidExpDtStr: reqBody.mUnidExpDtStr || '',
    mState: reqBody.mState || '',
    mSCode: reqBody.mSCode || '',
    mJobTitle: reqBody.mJobTitle || '',
    mCertificates: reqBody.mCertificates || [],

    ua: reqBody.ua,

    cuType: uType,
    cUser: tData.iss,
    cuName: tData.fn + ' ' + tData.ln,
    cDate: curUtc.currUTCDtTm,
    cDtStr: curUtc.currUTCDtTmStr,
    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr,
  }
}

const setIntrvwUpdateData = (ifPath, reqBody, tData) => {
  const curUtc = cs.currUTCObj();

  return {

    iSchedules: reqBody.iSchedules,
    process: reqBody.process,
    invWith: reqBody.invWith,
    round: reqBody.round,
    isDt: reqBody.isDt,
    isDtStr: reqBody.isDtStr,
    iTz: reqBody.iTz,
    duration: reqBody.duration,
    iStatus: reqBody.iStatus,
    isNotes: reqBody.isNotes || '',

    panelMembers: reqBody.panelMembers || '',
    testCompany: reqBody.testCompany || '',
    ...ifPath,

    isVrfd: false,

    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr,
  }
}

const setIntrwStsLcData = (body, tData) => {
  const curUtc = cs.currUTCObj();

  return {
    _id: uuidv4(),
    submission: body.submission,
    subId: body.subId,
    euUser: body.euUser,
    euName: body.euName,
    euPrimary: body.euPrimary,
    euRefID: body.euRefID,
    lead: body.lead,
    leadId: body.leadId,
    intrw: body._id,
    intrwId: body.intrwId,
    b2b: body.b2b,
    b2bName: body.b2bName,
    b2bCode: body.b2bCode,

    org: body.org,
    orgName: body.orgName,
    orgCode: body.orgCode,

    process: body.process,
    invWith: body.invWith,
    round: body.round,
    isDt: body.isDt,
    isDtStr: body.isDtStr,
    iTz: body.iTz,
    duration: body.duration,
    canName: body.canName,
    canPhNum: body.canPhNum,
    canEmail: body.canEmail,
    jobTitle: body.jobTitle,
    jobId: body.jobId,
    jobDesc: body.jobDesc,
    skills: body.skills,

    iStatus: body.iStatus,
    iNotes: body.iNotes,
    jobLoc: body.jobLoc,

    cuType: uType,
    cUser: tData.iss,
    cuName: tData.fn + ' ' + tData.ln,
    cuRefID: tData.uid,
    cuRole: 'Employee',
    cDate: curUtc.currUTCDtTm,
    cDtStr: curUtc.currUTCDtTmStr
  };
}

const setItrvwLfcData = (data, tData) => {
  const curUtc = cs.currUTCObj();

  return {
    ...data,
    _id: uuidv4(),
    intrw: data._id,
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
