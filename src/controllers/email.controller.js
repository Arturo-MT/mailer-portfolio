const { gmail } = require("../config");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const sendEmail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const content = `
            <h2>Nodemailer form</h2>
            <ul>
                <li>Name: ${name}</li>
                <li>Email: ${email}</li>
            </ul>
            <p>${message}</p>
            `;
    const oAuth2Client = new google.auth.OAuth2(
      gmail.clientId,
      gmail.clientSecret,
      gmail.redirectURI
    );

    oAuth2Client.setCredentials({ refresh_token: gmail.refreshToken });
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ingatorrez@gmail.com",
        clientId: gmail.clientId,
        clientSecret: gmail.clientSecret,
        refreshToken: gmail.refreshToken,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: email,
      to: "ingatorrez@gmail.com",
      subject: `${name} Portfolio`,
      html: content,
    };
    const result = await transporter.sendMail(mailOptions);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = sendEmail;
