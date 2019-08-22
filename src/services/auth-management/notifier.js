
const {inspector} = require('../../plugins/lib');
const errors = require('@feathersjs/errors');
const {detectLang, getLangMessages} = require('../../plugins/lib/lang-helpers');
const debug = require('debug')('app:service.authManagement.notifier');
const isLog = false;
const isDebug = false;

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
      let tokenLink, email, lang, fullName, verifyToken, verifyShortToken, resetToken, resetShortToken, langMsgs, langMsg;
      fullName = `${user.firstName} ${user.lastName}`;

      switch (type) {
      case 'resendVerifySignup': //sending the user the verification email

        if(isLog) inspector('auth-management.notifier.user:', user);
        verifyToken = user.verifyToken;
        verifyShortToken = user.verifyShortToken;

        tokenLink = getLink('verify', verifyToken);
        // Detect lang message
        lang = await detectLang(fullName);
        langMsgs = getLangMessages(lang);
        langMsg = langMsgs['authManagement']['mailResendVerifySignUp'].replace('{tokenLink}', tokenLink).replace('{shortToken}', verifyShortToken);
        email = {
          from: process.env.FROM_EMAIL,
          to: user.email,
          subject: 'Verify SignUp',
          html: langMsg
        };
        return await sendEmail(email);
      case 'verifySignup': // confirming verification
        // Detect lang message
        lang = await detectLang(fullName);
        langMsgs = getLangMessages(lang);
        langMsg = langMsgs['authManagement']['mailVerifySignUp'];
        email = {
          from: process.env.FROM_EMAIL,
          to: user.email,
          subject: 'Confirm SignUp',
          html: langMsg
        };
        return await sendEmail(email);
      case 'sendResetPwd':
        if(isLog) inspector('auth-management.notifier.user:', user);
        resetToken = user.resetToken;
        resetShortToken = user.resetShortToken;

        tokenLink = getLink('reset', resetToken);
        // Detect lang message
        lang = await detectLang(fullName);
        langMsgs = getLangMessages(lang);
        langMsg = langMsgs['authManagement']['mailSendResetPwd'].replace('{tokenLink}', tokenLink).replace('{shortToken}', resetShortToken);
        email = {
          from: process.env.FROM_EMAIL,
          to: user.email,
          subject: 'Password reset',
          html: langMsg
        };
        return await sendEmail(email);
      case 'resetPwd':
        // Detect lang message
        lang = await detectLang(fullName);
        langMsgs = getLangMessages(lang);
        langMsg = langMsgs['authManagement']['mailResetPwd'];
        email = {
          from: process.env.FROM_EMAIL,
          to: user.email,
          subject: 'Confirm Password reset',
          html: langMsg
        };
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
