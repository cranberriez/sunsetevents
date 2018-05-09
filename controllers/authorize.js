var secret = "";
var crypto = require('crypto')
var fs = require('fs')
var CryptoJS = require("crypto-js")

module.exports = {
  hash: function(toHash) {
    return crypto.createHmac('sha256', secret).update(toHash).digest('hex')
  },

  generateToken: function(data) {
    function base64url(source) {
      // Encode in classical base64
      encodedSource = CryptoJS.enc.Base64.stringify(source);

      // Remove padding equal characters
      encodedSource = encodedSource.replace(/=+$/, '');

      // Replace characters according to base64url specifications
      encodedSource = encodedSource.replace(/\+/g, '-');
      encodedSource = encodedSource.replace(/\//g, '_');

      return encodedSource;
    }
    try {
      var header = {
        "alg": "HS256",
        "typ": "JWT"
      };

      var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
      var encodedHeader = base64url(stringifiedHeader);

      var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
      var encodedData = base64url(stringifiedData);

      var token = encodedHeader + "." + encodedData;

      var signature = CryptoJS.HmacSHA256(token, secret);
      signature = base64url(signature);

      var signedToken = token + "." + signature;
      return signedToken
    } catch(err) {
      throw err;
    }
  },

  getUserInfo: function(user) {
    try {
      var passwords = JSON.parse(fs.readFileSync("./json/passwords.json").toString());
      if (Object.keys(passwords).includes(user)) {
        return passwords[user].hash
      } else {
        return ''
      }
    } catch(err) {
      throw err;
    }
  },

  confirmToken: function(req) {
    try {
      let clientToken = authorize.generateToken(authorize.hash(req.body.password))
      let serverToken = authorize.generateToken(authorize.getUserInfo(req.body.login))
      if (clientToken === serverToken) {
        return true
      } else {
        return false
      }
    } catch(err) {
      throw err;
    }
  }
}
