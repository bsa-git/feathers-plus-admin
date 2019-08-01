
const {inspector} = require('../../plugins/lib');
var errors = require('@feathersjs/errors');
const debug = require('debug')('app:service.authManagement.notifier');
const isLog = true;
const isDebug = true;

module.exports = function(app) {

  /**
   * Get link
   * @param type
   * @param hash
   * @return {string}
   */
  function getLink(type, hash) {
    const url = `${process.env.BASE_URL}/user/${type}?token=${hash}`;
    if(isDebug) debug('getLink.url:', url);
    return url;
  }

  /**
   * Send email
   * @param email
   */
  async function sendEmail(email) {
    try {
      const mailer = app.service('mailer');
      if(isDebug) debug('sendEmail.email:', email);
      const result = await mailer.create(email);
      if(isLog) inspector('app:service.authManagement.notifier.sendEmail.result:', result);
    }catch(err){
      if(isLog) inspector('app:service.authManagement.notifier.sendEmail.error:', err);
      new errors.BadRequest(`Error while sending email: ${err.message}`);
    }
  }

  return {
    notifier: async function(type, user) {// notifier: function(type, user, notifierOptions
      let tokenLink;
      let email;
      switch (type) {
      case 'resendVerifySignup': //sending the user the verification email
        tokenLink = getLink('verify', user.verifyToken);
        email = {
          from: process.env.FROM_EMAIL,
          to: user.email,
          subject: 'Verify SignUp',
          html: `To finish the email verification, follow this link  "${tokenLink}" or enter verification code ${user.verifyShortToken} in the form field`
        };
        return await sendEmail(email);
      case 'verifySignup': // confirming verification
        // tokenLink = getLink('verify', user.verifyToken);
        email = {
          from: process.env.FROM_EMAIL,
          to: user.email,
          subject: 'Confirm SignUp',
          html: 'Thanks for verifying your email'
        };
        return await sendEmail(email);
      case 'sendResetPwd':
        tokenLink = getLink('reset', user.resetToken);
        email = {};
        return await sendEmail(email);
      case 'resetPwd':
        tokenLink = getLink('reset', user.resetToken);
        email = {};
        return await sendEmail(email);
      case 'passwordChange':
        email = {};
        return await sendEmail(email);
      case 'identityChange':
        tokenLink = getLink('verifyChanges', user.verifyToken);
        email = {};
        return await sendEmail(email);
      default:
        break;
      }
    }
  };
};
