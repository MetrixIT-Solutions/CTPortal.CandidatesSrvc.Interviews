/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var fs = require('fs');
var multer = require('multer');

const util = require('../lib/util');
const SetRes = require('../SetRes');
const euIntrvwsCvs = require('./apiVldns/EuIntrvwsCtrlVldns');
const euIntrvwsSrvc = require('../services/EuIntrvwsSrvc');
const tokens = require('../tokens');
const cs = require('../services/CommonSrvc');

const apiServerStatus = (req, res) => {
  const resObj = SetRes.apiServerStatus();
  util.sendApiRes(res, resObj);
}

const getEuIntrvwsList = (req, res) => {
  const vds = euIntrvwsCvs.listVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = euIntrvwsCvs.tokenVldn(tData);
      if (tv.flag) {
        euIntrvwsSrvc.getEuIntrvwsList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else {
        util.sendApiRes(res, tv.result);
      }
    });
  } else {
    util.sendApiRes(res, vds.result);
  }
}

var storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    const imgid = await getFolderId(req.params.imgid);
    var uplLoc = 'assets/files/' + imgid;
    if (!fs.existsSync(uplLoc)) {
      fs.mkdirSync(uplLoc);
    }
    callback(null, uplLoc);
  },

  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage }).single('file');

const postEuIntrvwCreate = (req, res, next) => {
  upload(req, res, (err) => {
    const vds = euIntrvwsCvs.createVldn(req);
    if (vds.flag) {
      const devInfo = JSON.parse(req.headers.ctpeuua);
      tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
        const tv = euIntrvwsCvs.tokenVldn(tData);
        if (tv.flag) {
          euIntrvwsSrvc.postEuIntrvwCreate(req, tData, (resObj) => {
            const apiRes = {...resObj, userObj: tData?.data};
            util.sendApiRes(res, apiRes);
          });
        } else {
          if (req.file) {
            const filesPath = [req.file];
            cs.dltFolder(filesPath);
          }
          util.sendApiRes(res, tv.result);
        }
      });
    } else {
      if (req.file) {
        const filesPath = [req.file];
        cs.dltFolder(filesPath);
      }
      util.sendApiRes(res, vds.result);
    }
  });
}

const getEuIntrvwView = (req, res) => {
  const vds = euIntrvwsCvs.viewVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = euIntrvwsCvs.tokenVldn(tData);
      if (tv.flag) {
        euIntrvwsSrvc.getEuIntrvwView(req.params.recordid, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else {
        util.sendApiRes(res, tv.result);
      }
    });
  } else {
    util.sendApiRes(res, vds.result);
  }
}

const putEuIntrvwUpdate = (req, res) => {
  upload(req, res, (err) => {
    const vds = euIntrvwsCvs.updateVldn(req);
    if (vds.flag) {
      const devInfo = JSON.parse(req.headers.ctpeuua);
      tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
        const tv = euIntrvwsCvs.tokenVldn(tData);
        if (tv.flag) {
          euIntrvwsSrvc.putEuIntrvwUpdate(req, tData.tokenData, (resObj) => {
            const apiRes = {...resObj, userObj: tData?.data};
            util.sendApiRes(res, apiRes);
          });
        } else {
          if (req.file) {
            const filesPath = [req.file];
            cs.dltFolder(filesPath);
          }
          util.sendApiRes(res, tv.result);
        }
      });
    } else {
      if (req.file) {
        const filesPath = [req.file];
        cs.dltFolder(filesPath);
      }
      util.sendApiRes(res, vds.result);
    }
  });
}

const getEuIntrvwStsLfc = (req, res) => {
  const vds = euIntrvwsCvs.viewVldn(req);
  if (vds.flag) {
    const devInfo = JSON.parse(req.headers.ctpeuua);
    tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
      const tv = euIntrvwsCvs.tokenVldn(tData);
      if (tv.flag) {
        euIntrvwsSrvc.getEuIntrvwStsLfc(req.params.recordid, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else {
        util.sendApiRes(res, tv.result);
      }
    });
  } else {
    util.sendApiRes(res, vds.result);
  }
}

const putIntrvwDataUpdate = (req, res) => {  
  const body = req.body.data;
  const vds = euIntrvwsCvs.intrvwUpdtVldn(req);    
  if (vds.flag) {
   const tData = tokens.userTokenDecode(req.headers.ctpeuatoken);
      const tv = euIntrvwsCvs.tokenVldn(tData);  
      if (tv.flag) {
        euIntrvwsSrvc.putIntrvwDataUpdate(body, tData.tokenData, (resObj) => {          
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else {
        util.sendApiRes(res, tv.result);
      }
  } else {
    util.sendApiRes(res, vds.result);
  }
}

const postIntrvwPriCreate = (req, res) => {
  const vds = euIntrvwsCvs.intwPrtUpdtVldn(req);  
  if (vds.flag) {
    const tData = tokens.userTokenDecode(req.headers.ctpeuatoken);
    const tv = euIntrvwsCvs.tokenVldn(tData);
    if (tv.flag) {
      euIntrvwsSrvc.postIntrvwPriCreate(req.params.id, req.body, tData.tokenData, (resObj) => {          
        const apiRes = { ...resObj, userObj: tData?.data };
        util.sendApiRes(res, apiRes);
      });
    } else {
      util.sendApiRes(res, tv.result);
    }
  } else {
    util.sendApiRes(res, vds.result);
  }
}

const putIntrvwsStsUpdate = (req, res) => {
  upload(req, res, (err) => {
    const vds = euIntrvwsCvs.statusUpdVldn(req);
    if (vds.flag) {
      const devInfo = JSON.parse(req.headers.ctpeuua);
      tokens.refreshToken(req.headers.ctpeuatoken, req.ip || devInfo.ip, res, (tData) => {
        const tv = euIntrvwsCvs.tokenVldn(tData);
        if (tv.flag) {
          euIntrvwsSrvc.putIntrvwsStsUpdate(req, tData, (resObj) => {
            const apiRes = { ...resObj, userObj: tData?.data };
            util.sendApiRes(res, apiRes);
          });
        } else {
          if (req.file) {
            const filesPath = [req.file];
            cs.dltFolder(filesPath);
          }
          util.sendApiRes(res, tv.result);
        }
      });
    } else {
      if (req.file) {
        const filesPath = [req.file];
        cs.dltFolder(filesPath);
      }
      util.sendApiRes(res, vds.result);
    }
  });
}

module.exports = {
  apiServerStatus, getEuIntrvwsList, postEuIntrvwCreate, getEuIntrvwView, putEuIntrvwUpdate,
  getEuIntrvwStsLfc, putIntrvwDataUpdate, postIntrvwPriCreate, putIntrvwsStsUpdate
};

const getFolderId = async (imgid) => {
  if (imgid) {
    return imgid;
  } else {
    const currNum = cs.getCurrNum();
    return currNum;
  }
}