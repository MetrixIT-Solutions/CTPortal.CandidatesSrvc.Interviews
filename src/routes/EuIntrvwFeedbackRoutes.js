/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const euifCtrl = require('../controllers/EuIntrvwFeedbackCtrl');

module.exports.controller = (app) => {

  app.post('/ctpcust/v1/eusr/interview/feedback/list/:recordId', euifCtrl.getEusrItrvwFeedbkList);
  app.post('/ctpcust/v1/eusr/interview/feedback/create', euifCtrl.postEuItrvwFeedBkCreate);
  app.get('/ctpcust/v1/eusr/interview/feedback/view', euifCtrl.getEuItrvwFeedback);
  app.put('/ctpcust/v1/eusr/interview/feedback/update/:recordId', euifCtrl.putEuItrvwFeedBkUpdate);

};
