
module.exports = async function (appClient, accessToken) {
  try {
    await appClient.authenticate({
      strategy: 'jwt',
      accessToken,
    });
  } catch(err) {
    throw err;
  }
};
