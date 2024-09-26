const { error } = require('console');
const { fetchMyIP } = require('./iss');
const {fetchCoordsByIP } = require('./iss');
const {fetchISSFlyOverTimes } = require('./iss');



fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , coordinates);
});
const coor = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(coor, (error, timePassed) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Flyover Time:' , timePassed);
});