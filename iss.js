const { error } = require('console');
const needle = require('needle');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
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
module.exports = {
  fetchMyIP,
  fetchCoordsByIP };