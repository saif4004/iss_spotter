const needle = require('needle');


const fetchMyIP = function() {
  return needle('get','https://api.ipify.org?format=json')
  .then((response) => {
    const body = response.body; 
    return body.ip;
  });
};

const fetchCoordsByIP = function(ip) {
  return needle('get',`http://ipwho.is/${ip}`)
  .then((response) => {
    const body = response.body; 
    const latitude = body.latitude;
    const longitude = body.longitude;
    return {latitude, longitude};
  });

};

const fetchISSFlyOverTimes = function(coor) {
  
  
  return needle('get', `https://iss-flyover.herokuapp.com/json/?lat=${coor.latitude}&lon=${coor.longitude}`)
  .then((response) => {
    const body = response.body;
    return body.response;
  });



};
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then((ip) => fetchCoordsByIP(ip))
  .then((coor) => fetchISSFlyOverTimes(coor))
  .then((passtimes) => {
    return passtimes;
  });

}

module.exports = {  nextISSTimesForMyLocation };