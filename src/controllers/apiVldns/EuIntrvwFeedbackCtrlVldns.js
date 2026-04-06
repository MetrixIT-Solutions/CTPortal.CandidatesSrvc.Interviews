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

const euIntrvwfbListVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else if (!req.params.recordId || !reqBody.pgNum) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const euitFbCrtVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else if (!req.body.intrw || !reqBody.intrwId || !reqBody.submission || !reqBody.subId || !reqBody.process || !reqBody.duration || !reqBody.jobTitle || !reqBody.skills || !reqBody.qus) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const euIntrvwfbViewVldn = (req) => {
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else if (!req.params.recordId) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const euitFbUpdVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else if (!req.params.recordId || !reqBody.ifNotes || !reqBody.qus) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

module.exports = {
  tokenVldn, euIntrvwfbListVldn, euitFbCrtVldn, euIntrvwfbViewVldn, euitFbUpdVldn
};
