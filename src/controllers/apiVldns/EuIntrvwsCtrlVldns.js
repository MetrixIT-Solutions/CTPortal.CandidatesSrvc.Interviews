/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../../SetRes');

const tokenVldn = (tData) => {
  if (!tData) {
    const result = SetRes.tokenInvalid();
    return { flag: false, result };
  } else if (tData.isExpired) {
    const result = SetRes.tokenExpired();
    return { flag: false, result };
  } else if (!tData.tokenData) {
    const result = SetRes.tokenSsnErr();
    return { flag: false, result };
  } else {
    return { flag: true, result: tData.tokenData };
  }
}

const listVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else if (!reqBody.pgNum || !reqBody.limit) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const createVldn = (req) => {
  const reqBody = JSON.parse(req.body.intrvwData);
  const bv = bodyValidation(reqBody);
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else if (!bv || !reqBody.submission || !reqBody.subId || !reqBody.b2bUser || !reqBody.b2buName || !reqBody.b2buRole || !reqBody.b2bUsers.length) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const viewVldn  = (req) => {
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else if (!req.params.recordid) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const updateVldn = (req) => {
  const reqBody = JSON.parse(req.body.intrvwData);
  const bv = bodyValidation(reqBody);
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else if (!bv || !req.params.recordid) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const intrvwUpdtVldn = (req) => {
  const reqBody = req.body.data;
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if(!reqBody._id || !reqBody.name || !reqBody.mobCcNum){
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  }  else {
    return { flag: true };
  }
}

const intwPrtUpdtVldn = (req) => {
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.id) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const statusUpdVldn = (req) => {
  const reqBody = JSON.parse(req.body.intrvwData);
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.recordId || !reqBody.status) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

module.exports = {
  tokenVldn, listVldn, createVldn, viewVldn, updateVldn, intrvwUpdtVldn, intwPrtUpdtVldn, statusUpdVldn
};

const bodyValidation = (body) => {
  if (body.process && body.isDt && body.isDtStr && body.iTz && body.duration && body.jobTitle && body.skills && body.iStatus && body.vType && body.vName && body.vcPerson && body.vcMobCc && body.vcMobNum && body.vcMobCcNum && body.vcEmail && body.city && body.cCode && body.country && body.sCode && body.state && body.round && body.invWith){
   return true
  } else {
    return false
  }
}