/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const euItCv = require('../controllers/apiVldns/EuIntrvwFeedbackCtrlVldns');
const euItfSrvc = require('../services/EuItrvwFeedbackSrvc');
const util = require('../lib/util');
const tokens = require('../tokens');

const getEusrItrvwFeedbkList = (req, res) => {
  const vds = euItCv.euIntrvwfbListVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = euItCv.tokenVldn(tData);
      if (tv.flag) {
        euItfSrvc.getEusrItrvwFeedbkList(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const postEuItrvwFeedBkCreate = (req, res) => {
  const vds = euItCv.euitFbCrtVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = euItCv.tokenVldn(tData);
      if (tv.flag) {
        euItfSrvc.postEuItrvwFeedBkCreate(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const getEuItrvwFeedback = (req, res) => {
  const vds = euItCv.euIntrvwfbViewVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = euItCv.tokenVldn(tData);
      if (tv.flag) {
        euItfSrvc.getEuItrvwFeedback(req.params.recordId, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putEuItrvwFeedBkUpdate = (req, res) => {
  const vds = euItCv.euitFbUpdVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = euItCv.tokenVldn(tData);
      if (tv.flag) {
        euItfSrvc.putEuItrvwFeedBkUpdate(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

module.exports = {
  getEusrItrvwFeedbkList, postEuItrvwFeedBkCreate, getEuItrvwFeedback, putEuItrvwFeedBkUpdate
};
