/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const apiServerStatus = () => {
  return {httpStatus: 200, status: '200', resData: {message: 'CT(Candidates Tracking) Portal End Users - B2B End Users / Candidates / Applicants Interviews API Service.'}};
}
const successRes = (result) => {
  return {httpStatus: 200, status: '200', resData: {message: 'Success', result}};
}
const noData = (result) => {
  return {httpStatus: 400, status: '204', resData: {message: '204 - No Data Found', result}};
}
const mandatory = () => {
  return {httpStatus: 400, status: '198', resData: {message: 'Provide required field(s) data'}};
}
const unKnownErr = (result) => {
  return {httpStatus: 500, status: '199', resData: {message: '500 - Unknown Error', result}};
}

const tokenSsnErr = () => {
  return {httpStatus: 400, status: '189', resData: {message: 'Session error'}};
}
const tokenExpired = () => {
  return {httpStatus: 400, status: '190', resData: {message: 'Token Expired'}};
}
const tokenInvalid = () => {
  return {httpStatus: 500, status: '191', resData: {message: 'Invalid Token'}};
}
const tokenRequired = () => {
  return {httpStatus: 400, status: '192', resData: {message: 'Token is required'}};
}
const accessDenied = () => {
  return {httpStatus: 400, status: '193', resData: {message: 'You do not have access'}};
}
const deleteFailed = (result) => {
  return {httpStatus: 400, status: '194', resData: {message: 'Delete Failed', result}};
}
const createFailed = (result) => {
  return {httpStatus: 400, status: '196', resData: {message: 'Create Failed', result}};
}
const updateFailed = (result) => {
  return {httpStatus: 400, status: '195', resData: {message: 'Update Failed', result}};
}
const uniqueErr = (result) => {
  return {httpStatus: 400, status: '103', resData: {message: result}};
}
const headersRequired = () => {
  return {httpStatus: 400, status: '104', resData: {message: 'Missed required headers data'}};
}

module.exports = {
  apiServerStatus, successRes, noData, mandatory, unKnownErr, tokenSsnErr, tokenExpired, tokenInvalid, tokenRequired, 
  accessDenied, deleteFailed, createFailed, updateFailed, uniqueErr, headersRequired
};
