import  gmailTransport from './nodemailer.config';

const sendRecoveryEmail = async ({ email, code, username }) => {
    try {
        await gmailTransport.sendMail({
          from: 'Keeper',
          to: email,
          subject: 'Recuperar Contraseña',
          html: `
          <div style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;">
            <h1 style="color:#black; font-size:2.2em; text-align:left;">Hola, ${username} </h1>
          <p style="color:#333; font-size:1.3em; text-align:Justify;">
              Así que no te olvidas de la cabeza porque la tenes pegada. Tranquilo
              guachin, acá tenemos todo cubierto. Ingresá el siguiente codigo en 
              nuestra pagina para recuperar la cuenta:</p>
          
          <h3 style="color:#c47000; letter-spacing: 0.2em; font-size:2em;"> ${code} </h3>
          <a href="">
          <button style=" background-color: #FEE37F;
                          cursor: pointer;
                          margin: 0.6em auto;
                          border: none;
                          border-radius: 0.4em;
                          font-size: 1em;
                          font-weight: 600;
                          height: 4em;
                          cursor: pointer;
                          width: 20em;">Ingresar Codigo</button>
                          </a>
        </div>
          `,
        });
      } catch (err) {
        console.log(err);
      }
};


export { sendRecoveryEmail };