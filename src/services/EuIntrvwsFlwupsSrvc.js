/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const intrvwFwlsDaoImpl = require('../daos/daosimpls/EuIntrvwsFwlpsDaosImpl');
const intrvwFwlpsDao = require('../daos/EuIntrvwFwlpsDaos');

const euIntrvwFwlsCreate = (reqBody, tData, callback) => {
  const crtFlwsObj = intrvwFwlsDaoImpl.euIntrvwFwlsCreate(reqBody, tData);
  intrvwFwlpsDao.commonCreateFunc(crtFlwsObj, callback);
}

const euIntrvwFwlsList = (intrwId, tData, callback) => {
  const query = intrvwFwlsDaoImpl.getQuery(intrwId, tData);
  intrvwFwlpsDao.euIntrvwFwlsList(query, callback);
}

const euIntrvwFwlsUpdate = (id, reqBody, tData, callback) => {
  const updtObj = intrvwFwlsDaoImpl.euIntrvwFwlsUpdate(id, reqBody, tData);
  intrvwFwlpsDao.euIntrvwFwlsUpdate(updtObj.query, updtObj.updateObj, callback);
}

module.exports = {
  euIntrvwFwlsCreate, euIntrvwFwlsList, euIntrvwFwlsUpdate
};
