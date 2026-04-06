/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../../SetRes');

const euIntrvwFwlsCreate = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpeuatoken) {
    const tr = SetRes.tokenRequired();
    return { flag: false, result: tr };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else {
    const data = euIntrvwVldnData(reqBody)
    if (!data) {
      const mandatory = SetRes.mandatory();
      return { flag: false, result: mandatory };
    } else {
      return { flag: true };
    }
  }
}

const euIntrvwFwlsList = (req) => {
  if (!req.headers.ctpeuatoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else if (!req.params.intrwId) {
    const ad = SetRes.mandatory();
    return { flag: false, result: ad };
  } else {
    return { flag: true };
  }
}

const euIntrvwFwlsUpdate = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpeuatoken) {
    const tr = SetRes.tokenRequired();
    return { flag: false, result: tr };
  } else if (!req.headers.ctpeuua){
    const hr = SetRes.headersRequired();
    return {flag: false, result: hr};
  } else {
    if (!reqBody.notes && !req.params.recordId) {
      const mandatory = SetRes.mandatory();
      return { flag: false, result: mandatory };
    } else {
      return { flag: true };
    }
  }
}

module.exports = {
  euIntrvwFwlsCreate, euIntrvwFwlsList, euIntrvwFwlsUpdate  
};

const euIntrvwVldnData = (reqBody) => {
  if (!reqBody.intrw && !reqBody.intrwId && !reqBody.submission && !reqBody.subId && !reqBody.euUser && !reqBody.euName && !reqBody.notes) {
    return false;
  } else {
    return true;
  }
}