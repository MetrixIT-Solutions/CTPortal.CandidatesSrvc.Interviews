/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const async = require('async');
const fs = require('fs');
var { v4: uuidv4 } = require('uuid');

const moment = require('moment');
const mail = require('../../../config/mail');
const ApiCalls = require('../../ApiCalls');
const euIntrvwsDaos = require('../../daos/EuIntrvwsDaos');
const SetRes = require('../../SetRes');
const logger = require('../../lib/logger');
const config = require('config');
const cs = require('../../services/CommonSrvc');
const b2bEuInterviewsLcs = require('../../schemas/B2BEuInterviewsLcs');

const getEuIntrvwsListWithAsync = (matchQuery, countQuery, reqBody, callback) => {
  async.parallel([
    function (cb1) {
      euIntrvwsDaos.getEuIntrvwsList(matchQuery, reqBody, (resObj1) => {
        cb1(null, resObj1.resData.result);
      });
    },
    function (cb2) {
      euIntrvwsDaos.IntrvwsAggregateQuery(countQuery, (resObj2) => {
        cb2(null, resObj2.resData.result);
      });
    },
  ], function (err, result) {
    if (err) {
      logger.error('There was an Un-known Error occured in daos/EuIntrvwsSrvcImpls.js' + 'at getEuIntrvwsListWithAsync:' + err);
    }
    let resArr = {}
    if (result) {
      resArr = { intrvwsListCount: result[0].intrvwsListCount, intrvwsList: result[0].intrvwsList, intrvwsCountByStatus: result[1] }
    } else {
      resArr = { intrvwsListCount: result[0].intrvwsListCount, intrvwsList: result[0].intrvwsList, intrvwsCountByStatus: result[1] };
    }
    callback(SetRes.successRes(resArr));
  });
}

const updateIntrvwImage = (req, resData, value) => {
  const reqBody = JSON.parse(req.body.intrvwData);
  const pathData = reqBody.iPath ? reqBody.iPath.split(config.apiHost) : '';
  const path = pathData.length ? pathData[1] : '';
  if (req.file) {
    if (fs.existsSync(path))
      fs.unlink(path, (err) => {
        err && logger.error('Un-Known Error in services/EuIntrvwsSrvcImpls.js, at updateIntrvwImage - fs.unlink:' + err);
      });
  } else if (!reqBody.iconPath && reqBody.iPath) {
    const folderData = path.split(req.params.imgid);
    const folder = folderData.length ? folderData[0] : ''
    const filesPath = [{ destination: folder + req.params.imgid }];
    cs.dltFolder(filesPath);
  }
  if(value == 'update'){
    const data = Object.assign({}, resData.toObject());
    const data1 = { ...data, _id: uuidv4(), intrw: resData._id };
    const crObj = new b2bEuInterviewsLcs(data1);
    euIntrvwsDaos.postEuIntrvwCreate(crObj, (resObj) => { });
  }
}

const sendEmail = (intrvData, canData, tData) => {
  const email = canData.emID;
  const subDate = moment(intrvData.isDtStr).format('DD MMM, YYYY hh:mm A');
  const name = intrvData.canName ? intrvData.canName : 'User';
  const mailSub = `CT Portal Scheduled Interview - ${intrvData.intrwId}`;
  const content = `
    <p>Dear ${canData.name}</p>
    <p>We are pleased to inform you that, <i>${name}</i> interview is scheduled.</p>
    <p>Here are the interview details:</p>
    <p><b>Candidate Name:</b> ${name}</p>
    <p><b>Candidate Email:</b> ${intrvData.canEmail}</p>
    <p><b>Interview Date:</b> ${subDate} ${intrvData.iTz}</p>
    <p><b>Submission ID:</b> ${intrvData.subId}</p>
    <p><b>Interview ID:</b> ${intrvData.intrwId}</p>

    <p>Please review the form at your earliest convenience.</p>
    <p>Thank you for your attention.</p>
    <p>Best Regards</p>
    <p><b>${intrvData.orgName || intrvData.b2bName}</b></p>
  `;
  const body = { org: tData.org, b2b: tData.b2b};
  ApiCalls.getSmtpDetails(body, (err, resObj) => {
    if (resObj && resObj.status == '200') {
      const data = resObj.resData.result;
      if(data.smtp && data.smtpPort && data.senderMail && data.senderMailPswd && data.from){
        const smtpData = { service: data.service, host: data.smtp, port: data.smtpPort, user: data.senderMail, pass: data.senderMailPswd, from: data.from };
        mail.sendEMail(email, mailSub, content, smtpData, (resObj) =>{});
      } else {
        const smtpData = { service: 'gmail', host: config.smtp, port: config.smtpPort, user: config.senderMail, pass: config.senderMailPswd, from: 'NoReply<noreply@ctportal.ai>' }
        mail.sendEMail(email, mailSub, content, smtpData, (resObj) =>{});
      }
    } else {
      const smtpData = { service: 'gmail', host: config.smtp, port: config.smtpPort, user: config.senderMail, pass: config.senderMailPswd, from: 'NoReply<noreply@ctportal.ai>' }
      mail.sendEMail(email, mailSub, content, smtpData, (resObj) =>{});
    }
  })
}

module.exports = {
  getEuIntrvwsListWithAsync, updateIntrvwImage, sendEmail
};
