const nodemailer = require("nodemailer");
const {google} = require("googleapis");

const CLIENT_ID = '1045418554192-0110kdcq3022bfcpis5nlejn35iacmu6.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04kQqEFiluxIhCgYIARAAGAQSNwF-L9IrO_4qQV_RierYjgM7WIwZwfFfBQUIUKA7yUOh9JY1yM_sVVn1lV28k_qN5eQqqbuxjT4';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

const sendMail = async({from,to,user,otp})=>{
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
            subject: "Email Verification",
            text:`${user.FirstName} Welcome`,
      html: `<center>
      <table
        style="
          background: #ffffff;
          width: 600px;
          color: black;
          text-align: center;
        "
      >
        <tbody>
          <tr>
            <td>
              <span
                style="
                  display: block;
                  background: black;
                  color: white;
                  padding: 6px 0;
                  font-size: 16px;
                "
                >Connect pets to pet lovers</span
              >
              <h1 class="m_-7373064222375084159greeting">
              Welcome to PetBacker ${user.FirstName} ${user.LastName} 
              </h1>
              <p>
                Your Newly registerted account <strong>OTP PIN</strong>: ${otp}.
              </p>
              <p>This otp is valid only for 10 Minutes.</p>
              <p>
                For questions, please
                contact us at
                <a href="mailto:harshal_ghutkule@yahoo.com" target="_blank"
                  >harshal_ghutkule@yahoo.com</a
                >.
              </p>
              <p>Sincerely,<br />The PetBacker Team</p>
            </td>
          </tr>
        </tbody>
      </table>
    </center>`,
        });

          return info;
    }
    catch(err){
        return err;
    }
}
module.exports = {sendMail};