/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const euIntrvwFwlsCtrl = require('../controllers/EuIntrvwFlwupCtrl');

module.exports.controller = (app) => {

  app.post('/ctpeu/v1/eusr/intrvw/followup/create', euIntrvwFwlsCtrl.euIntrvwFwlsCreate);
  app.get('/ctpeu/v1/eusr/intrvws/followup/list/:intrwId', euIntrvwFwlsCtrl.euIntrvwFwlsList);
  app.put('/ctpeu/v1/eusr/intrvws/followup/update/:recordId', euIntrvwFwlsCtrl.euIntrvwFwlsUpdate);

}