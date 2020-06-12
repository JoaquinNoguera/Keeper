const { gmailTransport } = require('./nodemailer_config');

const sendRecoveryEmail = async ({ email, code, username }) => {
    try {
        await gmailTransport.sendMail({
          from: 'Keeper',
          to: 'nvjoaquin@gmail.com',
          subject: 'asdasdas',
          html: `
              <div class="container" style="padding:1rem;font-family: sans-serif;" >
                  <p style="margin-bottom:2rem">
                      Bienvenido a la comunidad de Mensapp, para finalizar su registro debe 
                  </p>
                  <a href="" class="link" style="padding: 1rem 2rem;background-color: #33b5e5;color: white;border:none;border-radius: 3rem;cursor: pointer;text-decoration:none;">Validar su cuenta</a>
              </div>
          `,
        });
      } catch (err) {
        console.log(err);
      }
};


module.exports.sendRecoveryEmail = sendRecoveryEmail;
