const sendGrid = require('@sendgrid/mail');
const config = require('../env');

const {sendgridKey} = config

sendGrid.setApiKey(sendgridKey);

module.exports.sendEmail = async function sendEmail(type,body){
    try{

        switch(type){
            case 'CODE':{
                const {email, user, code} = body;
                await sendGrid.send({
                    to: email,
                    from: "keeper@no_responder.com",
                    templateId:"d-6fe5e98082444e1e9b0de614d976dbbb",
                    dynamicTemplateData:{
                        user: user,
                        code: code,
                        link: `http://localhost:3001/recover/${code}`
                    }});
                break;
            }
        }
            
    } catch (err) {
        throw new Error('No se puedo mandar el  email')
    }
}
