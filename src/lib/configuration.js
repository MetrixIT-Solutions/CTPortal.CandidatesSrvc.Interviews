/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var conf = require('nconf');
conf.argv().env();

conf.update = function() {
    conf.file('src/statuses.json');
    return;
};

conf.update();

module.exports = conf;
