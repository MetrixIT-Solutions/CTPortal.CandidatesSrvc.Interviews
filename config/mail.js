/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const logger = require('../src/lib/logger');

// --- Begin sendEMail: Code to send an email

const sendEMail = (toUserEmail, mailSubject, htmlContent, smtpData, callback) => {
  const {service, host, port, user, pass, from} = smtpData;
  const srvc = service ? {service} : {};
  var transporter = nodemailer.createTransport(smtpTransport({
    ...srvc, host, port,
    auth: { user, pass }
  }));
  var mailOptions = {
    from,
    to: toUserEmail,
    subject: mailSubject,
    html: htmlContent
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error('There was an Error in config/mail.js, at sendEMail function:', error);
      callback(error, info);
    } else {
      callback(error, info);
    }
  });
}
// --- End sendEMail: Code to send an mail

module.exports = {
  sendEMail
};

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';
