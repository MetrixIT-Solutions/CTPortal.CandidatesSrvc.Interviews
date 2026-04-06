/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const axios = require('axios');
const config = require('config');

const getEuUserSsn = (ctpeuatoken, callback) => {
  const headers = { headers: {ctpeuatoken} };
  axios.post(config.ssnApi, {}, headers).then((res) => callback(null , res.data)).catch((err) => callback(err, {}));
}

const euUserSsnLogout = (ctpeuatoken, callback) => {
  const headers = { headers: {ctpeuatoken} };
  axios.post(config.ssnLogoutApi, {}, headers).then((res) => callback(null , res.data)).catch((err) => callback(err, {}));
}

module.exports = { getEuUserSsn, euUserSsnLogout };
