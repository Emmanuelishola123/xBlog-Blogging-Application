const otpGenerator = require('otp-generator')
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

// Extend Period
const extendPeriod = (amount, interval = "h", currentTime = new Date()) => {
  return moment(currentTime).add(Number(amount), interval).toDate();
}


const generateId = () => {
  let id = uuidv4();
  return id.replace(/-/g, "");
};


const generateOTP = (length = 6) => {
  return otpGenerator.generate(length, {
    digits: true,
    upperCaseAlphabets: true,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
}

module.exports = { extendPeriod, generateId, generateOTP };