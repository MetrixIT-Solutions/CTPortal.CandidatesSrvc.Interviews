/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const euiCtrl = require('../controllers/EuIntrvwsCtrl');

module.exports.controller = (app) => {

  app.get('/', euiCtrl.apiServerStatus);

  app.post('/ctpeu/v1/eusr/interviews/list', euiCtrl.getEuIntrvwsList);
  app.post('/ctpeu/v1/eusr/interview/create', euiCtrl.postEuIntrvwCreate);
  app.get('/ctpeu/v1/eusr/interview/view/:recordid', euiCtrl.getEuIntrvwView);
  app.put('/ctpeu/v1/eusr/interview/update/:recordid/:imgid', euiCtrl.putEuIntrvwUpdate);
  app.get('/ctpeu/v1/eusr/interview/sts/lfc/:recordid', euiCtrl.getEuIntrvwStsLfc);
  app.put('/ctpeu/v1/eusr/profile/interview/update', euiCtrl.putIntrvwDataUpdate);
  app.post('/ctpeu/v1/eusr/interview/priority/create/:id', euiCtrl.postIntrvwPriCreate);
  app.put('/ctpeu/v1/eusr/interview/status/update/:recordId/:imgid', euiCtrl.putIntrvwsStsUpdate);
};
