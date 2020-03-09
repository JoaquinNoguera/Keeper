const config = {
  port: process.env.PORT || 3000,
  urlDB: process.env.URL_DB,
  secretAccess: process.env.SECRET_ACCESS,
  secretRefresh: process.env.SECRET_REFRESH,
  secretSession: process.env.SECRET_SESSION,
  sendgridKey: process.env.SENDGRID_KEY
};

module.exports = config;
