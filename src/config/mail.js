const nodemailer = require("nodemailer");
const {google} = require("googleapis");

const CLIENT_ID = '1045418554192-0110kdcq3022bfcpis5nlejn35iacmu6.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04kQqEFiluxIhCgYIARAAGAQSNwF-L9IrO_4qQV_RierYjgM7WIwZwfFfBQUIUKA7yUOh9JY1yM_sVVn1lV28k_qN5eQqqbuxjT4';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

const sendMail = async({from,to,user})=>{
    try{
        const accessToken = await oAuth2Client.getAccessToken();
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                type:'OAuth2',
              user: 'harshalghutkule@gmail.com',
              clientId:CLIENT_ID,
              clientSecret:CLIENT_SECRET,
              refreshToken:REFRESH_TOKEN,
              accessToken:accessToken
            },
        });

        let info = await transporter.sendMail({
            from:from,
            to:to,
            subject:`Welcome to PetBacker ${user.FirstName} ${user.LastName}`,
            text:`${user.FirstName} Welcome`,
            html:`<b>${user.FirstName} Welcome to PetBacker</b>
            <br>
            <b>Welcome to the Family<b>
            `,
        });

          return info;
    }
    catch(err){
        return err;
    }
}
module.exports = {sendMail};