const { error } = require('console');
const needle = require('needle');

const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error,response,body) => {
    if (error) {
      return callback(error);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null,body.ip);
    
  });
};

const fetchCoordsByIP = function(ip,callback) {
  needle.get(`http://ipwho.is/${ip}`, (error,response,body) => {
    if (error) {
      callback(error,null);
      return;
    }
  
    if (!body.success) {
      const message = `status was ${body.success}. Server said: ${body.message} when trying to get IP ${body.ip}`;
      callback(Error(message), null);
      return;
    }

    const latitude = body.latitude;
    const longitude = body.longitude;
    callback(null,{latitude, longitude});
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {

  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    callback(null, body.response);
  });

};
module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes };