/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
var mongoose = require('mongoose');
var {v4: uuidv4} = require('uuid');

mongoose.createConnection(config.mongoDBConnection);
const Schema = mongoose.Schema;

// --- Begin: B2B Partner End Users Interview Followups Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  idSeq: {
    seq: {type: String, required: true}, // Country, State and Year(2022) Moth(10) Day(10)
    cCode: {type: String, required: false}, // Country Code: IND
    sCode: {type: String, required: false}, // State Code: TS
    year: {type: Number, required: true},
    month: {type: Number, required: true},
    day: {type: Number, required: true}
  },
  intrw: {type: String, required: true}, // Interview Record ID: _id
  intrwId: {type: String, required: true}, // Interview ID: AS1289I61577(First Name, Last Name, Current Year(2024) - 2023, Day of Year(289 - 15th Oct), 'I' for Interview, Current time in seconds(17:06:17))
  euUser: {type: String, required: true},
  cUId: {type: String, required: true}, // Created User refId
  euName: {type: String, required: true},
  submission: {type: String, required: true}, // Submission Record ID: _id
  subId: {type: String, required: true}, // Submission ID: AS1289S61577(First Name, Last Name, Current Year(2024) - 2023, Day of Year(289 - 15th Oct), 'S' for submission, Current time in seconds(17:06:17))
  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},

  org: {type: String, required: false},
  orgName: {type: String, required: false},
  orgCode: {type: String, required: false},
  obId: {type: String, required: false}, // Org Branch Record ID
  obName: {type: String, required: false}, // Org Branch Name
  obCode: {type: String, required: false}, // Org Branch Code
  team: {type: String, required: false},
  tName: {type: String, required: false}, // Team Name
  tCode: {type: String, required: false}, // Team Code

  notes: {type: String, required: true}, // IntrView Followups Notes

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuType: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cuName: {type: String, required: true}, // Created Users.pName
  cDate: {type: Date, required: true}, // Date & Time
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  uuType: {type: String, required: true}, // Updated User Type
  uUser: {type: String, required: true, trim: true}, // Updated Users._id
  uuName: {type: String, required: true}, // Updated Users.pName
  uDate: {type: Date, required: true}, // Date & Time
  uDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
});

schema.index({cuName: 'text', notes: 'text'});
schema.index({delFlag: -1, b2b: 1, intrw: 1});
schema.index({delFlag: -1, b2b: 1, intrwId: 1});
schema.index({delFlag: -1, b2b: 1, submission: 1});
schema.index({delFlag: -1, b2b: 1, subId: 1});
schema.index({cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BEuInterviewFollowups, schema);
// --- End: B2B Partner End Users Interview Followups Schema --- //
