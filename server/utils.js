/*
Nested Object Grabber
pass in your object structure as array elements

//to access nested array, just pass in array index as an element the path array.

const name = getNestedObject(user, ['personalInfo', 'name']);

//this will return the city from the first address item.

const city = getNestedObject(user, ['personalInfo', 'addresses', 0, 'city']);
*/
const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
};

//allowCrossDomain Middleware
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
 // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = { getNestedObject, allowCrossDomain }