/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const config = require('config');

const euIntrvwsDaosImpl = require('../daos/daosimpls/EuIntrvwsDaosImpl');
const euIntrvwsSrvcImpl = require('./srvcimpls/EuIntrvwsSrvcImpl');
const euIntrvwsDaos = require('../daos/EuIntrvwsDaos');
const ApiCalls = require('../ApiCalls');
const { subStatus } = require('../consts/EuIntrvwsConsts.json');
const cs = require('./CommonSrvc');
const awsS3bucket = require('../AwsS3Bucket');

const getEuIntrvwsList = (reqBody, tData, callback) => {
  const obj = euIntrvwsDaosImpl.euIntrvwsListQuery(reqBody, tData);
  euIntrvwsSrvcImpl.getEuIntrvwsListWithAsync(obj.matchQuery, obj.countQuery, reqBody, callback);
}

const postEuIntrvwCreate = async(req, tData, callback) => {
  const body = JSON.parse(req.body.intrvwData);
  const id = req.file ? req.file.destination.split('files/')[1] : uuidv4();
  const uplRes = req.file ? await awsS3bucket.awsS3Upload(id) : false;
  uplRes && cs.dltFolder([req.file]);
  const ifPath = uplRes ? config.awsS3Bucket + config.awsS3Cklst + req.file?.path.split('files')[1] : req.file ? config.apiHost + req.file.path : '';
  const obj = euIntrvwsDaosImpl.euIntrvwCreateQuery(ifPath, body, tData.tokenData);
  euIntrvwsDaos.postEuIntrvwCreate(obj.createObj, (resObj1) => {
    if (resObj1.status == '200') {
      const data = resObj1.resData.result;
      euIntrvwsDaos.postEuIntrvwCreate(obj.lfycObj, (resObj2) => { });
      const data1 = Object.assign({}, data.toObject());
      const intrwData = {...data1, nMessage: data.euName + ' Interview('+data.intrwId+') has been scheduled, please review', nTitle: 'Interview Scheduled', nFrom: 'Interviews'};
      data.iStatus === 'Scheduled' && ApiCalls.notificationCreate(intrwData,  (err, resData) =>{});
      const intrStsLcData = euIntrvwsDaosImpl.intrwStsLcData(data, tData.tokenData);
      euIntrvwsDaos.postEuIntrvwCreate(intrStsLcData, (resObj1) => {});
      const intrvObj = { intrw: data._id, intrwId: data.intrwId, submission: data.submission, status: subStatus };
      ApiCalls.updateEuSubmissionStatus(intrvObj, req.headers.ctpeuua, tData.ctpeuatoken, (err, resObj3) => { });
      const emails = [];
      const uData = body.ua && body.ua.length ? body.ua.filter(item => (item.role == 'Onsite Lead' || item.role == 'Onsite Manager' || item.role == 'Offshore Manager' || item.role == 'Offshore Lead' || item.role == 'Recruiter' || item.role == 'Mentor')) : [];
      uData && uData.length && uData.forEach(item => emails.push({emID: item.emID, name: item.name}));
      emails.map(item => {
        euIntrvwsSrvcImpl.sendEmail(data, item, tData.tokenData);
      });
    } else {
      if (req.file) {
        const filesPath = [req.file];
        cs.dltFolder(filesPath);
      }
    }
    callback(resObj1);
  });
}

const getEuIntrvwView = (id, tData, callback) => {
  const query = euIntrvwsDaosImpl.euIntrvwViewQuery(id, tData);
  euIntrvwsDaos.getEuIntrvwView(query, callback)
}

const putEuIntrvwUpdate = async(req, tData, callback) => {
  const body = JSON.parse(req.body.intrvwData);
  const id = req.file ? req.file.destination.split('files/')[1] : uuidv4();
  const uplRes = req.file ? await awsS3bucket.awsS3Upload(id) : false;
  uplRes && cs.dltFolder([req.file]);
  const ifPath = uplRes ? config.awsS3Bucket + config.awsS3Cklst + req.file.path.split('files')[1] : req.file ? config.apiHost + req.file.path : '';
  const query = euIntrvwsDaosImpl.euIntrvwViewQuery(req.params.recordid, tData);
  const upObj = euIntrvwsDaosImpl.putEuIntrvwUpdateObj(ifPath, body, tData);
  euIntrvwsDaos.putEuIntrvwUpdate(query, upObj, (resObj) => {
    if (resObj.status == '200') {
      const data = Object.assign({}, resObj.resData.result.toObject());
      const intrwData = {...data, nMessage: data.euName+' Interview('+data.intrwId+') has been Rescheduled, please review', nTitle: 'Interview Rescheduled', nFrom: 'Interviews'};
      ApiCalls.notificationCreate(intrwData,  (err, resData) =>{});
      euIntrvwsSrvcImpl.updateIntrvwImage(req, resObj.resData.result, 'update');
      const intrStsLcData = euIntrvwsDaosImpl.intrwStsLcData(resObj.resData.result, tData);
      euIntrvwsDaos.postEuIntrvwCreate(intrStsLcData, (resObj1) => {});
      if(req.file && body.iPath){
        if (body.iPath.includes(config.awsS3Cklst)) {
          const exPath = body.iPath.split(config.awsS3Cklst);
          exPath.length > 1 && awsS3bucket.awsS3Delete(config.awsS3Cklst + exPath[1]);
        } else if(body.iPath.includes(config.lclPath)) {
          const extpath = body.iPath.split('assets');
          const path = extpath.length > 1 ? [{destination: 'assets'+ extpath[1]}] : '';
          path && cs.dltFolder(path);
        }
      }
    } else {
      if (req.file) {
        const filesPath = [req.file];
        cs.dltFolder(filesPath);
      }
    }
    callback(resObj);
  });
}

const getEuIntrvwStsLfc = (recordId, tData, callback) => {
  const query = euIntrvwsDaosImpl.euIntwStsLfcQry(recordId, tData);
  euIntrvwsDaos.getEuIntrvwStsLfc(query, callback);
}

const putIntrvwDataUpdate = (reqBody, tData, callback) => {  
  const updateObj = euIntrvwsDaosImpl.putIntrvwDataUpdate(reqBody, tData);  
  euIntrvwsDaos.profileIntrvwUpdate(updateObj.query, updateObj.updtObj, callback);
}

const postIntrvwPriCreate = (id, reqBody, tData, callback) => {
  const updtObj = euIntrvwsDaosImpl.setPrtQuery(id, reqBody, tData);
  euIntrvwsDaos.putEuIntrvwUpdate(updtObj.query, updtObj.setPrtObj, callback);
}

const putIntrvwsStsUpdate = (req, tData, callback) => {
  const reqBody = JSON.parse(req.body.intrvwData);
  const file = req.file ?  {ifPath: config.apiHost + req.file.path} : {};
  const qry = euIntrvwsDaosImpl.euIntrvwViewQuery(req.params.recordId, tData.tokenData);
  const uObj = euIntrvwsDaosImpl.updateInvStatus(reqBody, file, tData.tokenData);
  euIntrvwsDaos.putEuIntrvwUpdate(qry, uObj, resObj => {
    if (resObj.status == '200') {
      const data = Object.assign({}, resObj.resData.result.toObject());
      const subLfcData = euIntrvwsDaosImpl.intrvwData(data, tData.tokenData);
      euIntrvwsDaos.postEuIntrvwCreate(subLfcData, resObj => {});
      const intrStsLcData = euIntrvwsDaosImpl.intrwStsLcData(data, data.iStatus, data.isNotes, tData.tokenData);
      euIntrvwsDaos.postEuIntrvwCreate(intrStsLcData, (resObj1) => {});
      callback(resObj);
      euIntrvwsSrvcImpl.updateIntrvwImage(req, resObj.resData.result, 'status');
      const body = {status: 'Placed'};
      reqBody.status == 'Placed' && ApiCalls.updateEuStatus(body, req.headers.ctpeuua, tData.ctpeuatoken, (resObj1) => {});
    } else callback(resObj);
  });
}

module.exports = {
  getEuIntrvwsList, postEuIntrvwCreate, putEuIntrvwUpdate, getEuIntrvwView, putEuIntrvwUpdate,
  getEuIntrvwStsLfc, putIntrvwDataUpdate, postIntrvwPriCreate, putIntrvwsStsUpdate
};
