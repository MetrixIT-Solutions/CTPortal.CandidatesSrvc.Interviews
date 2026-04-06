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

// --- Begin: B2B Partner End Users Interviews Schema --- //
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
  euUser: {type: String, required: true},
  euName: {type: String, required: true},
  euPrimary: {type: String, required: true},
  euRefID: {type: String, required: true},
  lead: {type: String, required: true},
  leadId: {type: String, required: true},
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
  pReports: {type: [String], required: true}, // Parent Reports

  iSchedules: [{ // Interview Schedules
    _id: {type: String, required: true}, // 1st Round, 2nd Round
    process: {type: String, required: true}, // Interview Screening Type: Video Interview, Audio Interview, Face to Face, Online Test, Written Test
    invWith: {type: String, required: true}, // Interview With: Vendor / Prime Vendor / Implementation
    round: {type: String, required: true}, // 1st Round, 2nd Round
    isDtStr: {type: String, required: true}, // Interview Start Date Time String: YYYY-MM-DD HH:mm
    iTz: {type: String, required: true}, // Interview Timezone
    duration: {type: Number, required: true}, // In Minutes
    isNotes: {type: String, required: false},

    vrfyNts: {type: String, required: false}, // Verify Notes
    vrfdBy: {type: String, required: false},
    vrfdByName: {type: String, required: false},
    vrfdDtStr: {type: String, required: false}, // Date Time String
    invsgtr: {type: String, required: false}, //Investigator
    invsgtrName: {type: String, required: false},
    invsgtrEmID: {type: String, required: false},
    invsgtrMobNum: {type: String, required: false}
  }],

  process: {type: String, required: true}, // Interview Screening Type: Video Interview, Audio Interview, Face to Face, Online Test, Written Test
  invWith: {type: String, required: true},  // Interview With: Vendor / Prime Vendor / Implementation
  round: {type: String, required: true}, // 1st Round, 2nd Round
  isDt: {type: Date, required: true}, // Interview Start Date Time: YYYY-MM-DD HH:mm
  isDtStr: {type: String, required: true}, // Interview Start Date Time String: YYYY-MM-DD HH:mm
  iTz: {type: String, required: true}, // Interview Timezone
  duration: {type: Number, required: true}, // In Minutes
  canName: {type: String, required: true}, // Candidate Name
  canPhNum: {type: String, required: true}, // Candidate Phone Number
  canEmail: {type: String, required: true}, // Candidate Email
  jobTitle: {type: String, required: true},
  jobId: {type: String, required: false},
  jobDesc: {type: String, required: false},
  skills: {type: String, required: true},

  iStatus: {type: String, required: true}, // Scheduled, Completed, Next Round, Selected, On Hold, Not Selected, Other
  isNotes: {type: String, required: false}, // Interview Status Notes/Reason
  jobLoc: {type: String, required: true}, // Job Location

  vType: {type: String, required: true}, // Vendor Type(Vendor): Vendor / Prime Vendor / Implementation
  vName: {type: String, required: true}, // Vendor Name(Vendor Company)
  vCode: {type: String, required: false}, // Vendor Code(Vendor Company Short Name) - for now not required
  vcPerson: {type: String, required: true}, // Vendor Contact Person(Vendor Name)
  vcMobCc: {type: String, required: true},
  vcMobNum: {type: String, required: true},
  vcMobCcNum: {type: String, required: true},
  vcEmail: {type: String, required: true},
  vClient: {type: String, required: false},
  pvipType: {type: String, required: false}, // Prime Vendor / Implementation Partner
  pvipName: {type: String, required: false}, // Prime Vendor / Implementation Partner Company
  pvipcPerson: {type: String, required: false},
  pvipcMobCc: {type: String, required: false},
  pvipcMobNum: {type: String, required: false},
  pvipcMobCcNum: {type: String, required: false},
  pvipcEmail: {type: String, required: false},
  pvipClient: {type: String, required: false},

  visaStatus: {type: String, required: false},
  tExp: {type: Number, required: false},
  primSkills: {type: String, required: false},
  wrkUrls: {type: [String], required: false},
  wrkAuthExpDtStr: {type: String, required: false},
  usaNatID: {type: String, required: false}, // USA issued national ID state: Number
  unidType: {type: String, required: false}, // USA issued national ID state Type: DL(Driving Licence)/State ID/Other
  unidExpDtStr: {type: String, required: false},
  resState: {type: String, required: false}, // Resdential
  resScode: {type: String, required: false},
  certificates: {type: [String], required: false},

  intrwId: {type: String, required: true}, // Interview ID: AS1289I61577(First Name, Last Name, Current Year(2024) - 2023, Day of Year(289 - 15th Oct), 'I' for Interview, Current time in seconds(17:06:17))
  panelMembers: {type: String, required: false},
  testCompany: {type: String, required: false}, // Test Company Name
  ifPath: {type: String, required: false}, // Interview Image Path

  prHr: {type: Number, required: false}, // Candidate Pay Rate Per Hour
  prNotes: {type: String, required: false}, // Pay Rate Notes
  prfPath: {type: String, required: false}, // Candidate Pay Rate Per Hour (RTR confirmation image) Path

  adrsName: {type: String, required: false}, // Office: MetrixIT, Teksolve IT
  hNum: {type: String, required: false}, // Building Name, House Number, Floor
  area: {type: String, required: false}, // Streat, Area, Village
  zip: {type: String, required: false}, // Zip Code, Pincode
  city: {type: String, required: true}, // City, District
  cityCode: {type: String, required: false}, // City Code, District Code
  state: {type: String, required: true},
  sCode: {type: String, required: true},
  country: {type: String, required: true},
  cCode: {type: String, required: true},

  mVisaStatus: {type: String, required: false},  // Marketing
  mEmail: {type: String, required: false},
  mMobCc: {type: String, required: false},
  mMobNum: {type: String, required: false},
  mTexp: {type: Number, required: false},
  mPrimSkills: {type: String, required: false},
  mCurrClient: {type: String, required: false},
  mPrevClient: {type: String, required: false},
  mWrkUrls: {type: [String], required: false},
  mWrkAuthExpDtStr: {type: String, required: false},
  mUsaNatID: {type: String, required: false}, // USA issued national ID state: Number
  mUnidType: {type: String, required: false}, // USA issued national ID state Type: DL(Driving Licence)/State ID/Other
  mUnidExpDtStr: {type: String, required: false},
  mState: {type: String, required: false},
  mScode: {type: String, required: false},
  mResState: {type: String, required: false},
  mResScode: {type: String, required: false},
  mJobTitle: {type: String, required: false},
  mCertificates: {type: [String], required: false},

  feedback: {type: [String], required: false},

  isVrfd: {type: Boolean, default: false}, // Is Verified
  vrfyNts: {type: String, required: false}, // Verify Notes
  vrfdBy: {type: String, required: false},
  vrfdByName: {type: String, required: false},
  vrfdDt: {type: Date, required: false}, // Date Time
  vrfdDtStr: {type: String, required: false}, // Date Time String
  invsgtr: {type: String, required: false}, //Investigator
  invsgtrName: {type: String, required: false},
  invsgtrEmID: {type: String, required: false},
  invsgtrMobNum: {type: String, required: false},

  ua: [{
    _id: {type: String, required: true}, //
    role: {type: String, required: true}, // Recruiter, Mentor, Onsite Manager, Ofshore Manager
    name: {type: String, required: true},
    mobCcNum: {type: String, required: true}, // Mobile Number with Country Code
    deskCcNum: {type: String, required: false},
    deskNumExtn: {type: String, required: false},
    emID: {type: String, required: true}, // Email ID
    refUID: {type: String, required: true}, // Reference Unique ID // teksolve:superadmin
    primary: {type: String, required: true}, // Mobile Number or Email // teksolve:admin@teksolveit.com
  }],

  priority: {type: String, required: false},

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

schema.index({canName: 'text', canPhNum: 'text', jobTitle: 'text', subId: 'text', intrwId: 'text', vName: 'text', vClient: 'text'});
schema.index({b2b: 1, intrwId: 1}, {unique: 1});
schema.index({delFlag: -1, b2b: 1, org: 1, pReports: 1, iStatus: 1});
schema.index({delFlag: -1, b2b: 1, org: 1, euUser: 1});
schema.index({cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BEuInterviews, schema);
// --- End: B2B Partner End Users Interviews Schema --- //