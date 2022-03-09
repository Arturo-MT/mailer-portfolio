const { config } = require('dotenv');

config();

module.exports ={
    gmail:{
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectURI: process.env.REDIRECT_URI,
        refreshToken: process.env.REFRESH_TOKEN,
    }
}