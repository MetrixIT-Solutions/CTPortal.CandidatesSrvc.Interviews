/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const token = require('../tokens');
const util = require('../lib/util');
const euIntrvwVldtn = require('../controllers/apiVldns/EuIntrvwsCtrlVldns');
const eusubFwlupVldtn = require('./apiVldns/EuIntrvwFwlupsCtrlVldns');
const euIntrvwFwlsSrv = require('../services/EuIntrvwsFlwupsSrvc');

const euIntrvwFwlsCreate = (req, res) => {  
  const euSubValid = eusubFwlupVldtn.euIntrvwFwlsCreate(req);
  if (euSubValid.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    token.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, tData => {
      const tokenValid = euIntrvwVldtn.tokenVldn(tData);
      if (tokenValid.flag) {
        euIntrvwFwlsSrv.euIntrvwFwlsCreate(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, euSubValid.result);
}

const euIntrvwFwlsList = (req, res) => {    
  const euSubValid = eusubFwlupVldtn.euIntrvwFwlsList(req);
  if (euSubValid.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    token.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, tData => {
      const tokenValid = euIntrvwVldtn.tokenVldn(tData);
      if (tokenValid.flag) {
        euIntrvwFwlsSrv.euIntrvwFwlsList(req.params.intrwId, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, euSubValid.result);
}

const euIntrvwFwlsUpdate = (req, res) => {
  const euSubValid = eusubFwlupVldtn.euIntrvwFwlsUpdate(req);
  if (euSubValid.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    token.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, tData => {
      const tokenValid = euIntrvwVldtn.tokenVldn(tData);
      if (tokenValid.flag) {
        euIntrvwFwlsSrv.euIntrvwFwlsUpdate(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tokenValid.result);
    });
  } else util.sendApiRes(res, euSubValid.result);
}

module.exports = {
 euIntrvwFwlsCreate, euIntrvwFwlsList, euIntrvwFwlsUpdate
};