const nodemailer = require('nodemailer');

const EMAIL_USERNAME = "keepercode.noresponder@gmail.com";
const COMMON_NAME = "Keeper";

console.log({
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
    accessToken: process.env.MAIL_ACCESS_TOKEN
})


const nodemailerSettings = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'Gmail',
    from: `"${COMMON_NAME}" <${EMAIL_USERNAME}>`, // You actually dont have to do this because Gmail overwrites it with the authenticated user anyway, but it's semantic
    auth: {
        type: 'OAuth2',
        user: EMAIL_USERNAME,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
        accessToken: process.env.MAIL_ACCESS_TOKEN,
        expires: 1591901313492
    },
    tls: {
        rejectUnauthorized: false
    }
};

const gmailTransport = nodemailer.createTransport(nodemailerSettings);

module.exports = { gmailTransport }