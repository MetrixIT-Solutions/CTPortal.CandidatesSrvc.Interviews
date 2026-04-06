/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var conf = require('./configuration');

var responseObj = {
    status: '200',
    message: 'Success',
    resData: {},
    userObj: {}
};

exports.sendApiRes = (response, resObj) => {
    responseObj.status = resObj.status;
    responseObj.message = conf.get(resObj.status);
    if (resObj.resData != null || !resObj.resData || !resObj.userObj) {
        responseObj.resData = resObj.resData;
        responseObj.userObj = resObj.userObj;
    } else {
        responseObj.resData = {};
        responseObj.userObj = {};
    }
    response.status(resObj.httpStatus).send(responseObj);
};
