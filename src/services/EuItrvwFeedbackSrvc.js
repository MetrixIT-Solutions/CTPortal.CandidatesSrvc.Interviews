/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const beuiDao = require('../daos/EuIntrvwsDaos');
const euItfDao = require('../daos/EuIntrvwFeedbackDao');
const euItfDaoImpl = require('../daos/daosimpls/EuIntrvwFeedbackDaosImpl');

const getEusrItrvwFeedbkList = (recordId, reqBody, tData, callback) => {
  const qry = euItfDaoImpl.euItFbQry(recordId, tData.b2b);
  euItfDao.getEusrItrvwFeedbkList(qry, reqBody.pgNum, callback);
}

const postEuItrvwFeedBkCreate = (reqBody, tData, callback) => {
  const data = euItfDaoImpl.b2bItrvwFeedBkData(reqBody, tData);
  euItfDao.postEuItrvwFeedBkCreate(data, resObj => {
    if(resObj.status === '200') {
      const qry = euItfDaoImpl.updateIntrvwFeedback(reqBody, {}, tData);
      beuiDao.putEuIntrvwUpdate(qry.query, qry.updateObj, irObj => {});
    }
    callback(resObj);
  });
}

const getEuItrvwFeedback = (recordId, tData, callback) => {
  const qry = euItfDaoImpl.getFbQry(recordId, tData.b2b);
  euItfDao.getEuItrvwFeedback(qry, callback);
}

const putEuItrvwFeedBkUpdate = (recordId, reqBody, tData, callback) => {
  const qry = euItfDaoImpl.getFbQry(recordId, tData.b2b);
  const uObj = euItfDaoImpl.intrvwFbUObj(reqBody, tData)
  euItfDao.putEuItrvwFeedBkUpdate(qry, uObj, resObj => {
    if(resObj.status == '200' && reqBody.intrw && reqBody.ifNotes !== reqBody.oldIfNotes) {
      beuiDao.getEuIntrvwView({_id: reqBody.intrw}, intObj => {
        if(intObj.status === '200') {
          const qry = euItfDaoImpl.updateIntrvwFeedback(reqBody, intObj.resData.result, tData);
          beuiDao.putEuIntrvwUpdate(qry.query, qry.updateObj, irObj => {});
        }
      });
    }
    callback(resObj);
  });
}

module.exports = {
  getEusrItrvwFeedbkList, postEuItrvwFeedBkCreate, getEuItrvwFeedback, putEuItrvwFeedBkUpdate
};
