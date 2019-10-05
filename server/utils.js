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

//asyncForEach helper
const asyncForEach = async function(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

//Checking for ALL properties of nutritionInfo
const checkNutritionData = (req) => {
  let nutrObj = {
    Calories: 0,
    Fat: 0,
    Carbohydrates: 0,
    Sugar: 0,
    Sodium: 0,
    Protein: 0,
    Fiber: 0
  };
  const nutrSet = new Set(['Calories', 'Fat', 'Carbohydrates', 'Sugar', 'Sodium', 'Protein', 'Fiber']);
  const nutrInfoFromReq = req.body.data.nutrition_info;
  for (let i = 0; i < nutrInfoFromReq.length; i++) {
    if (nutrSet.has(nutrInfoFromReq[i].title)) {
      nutrObj[title] = Math.ceil(nutrInfoFromReq[i].amount);
    } 
  }
  return nutrObj;
};

module.exports = { getNestedObject, allowCrossDomain, asyncForEach, checkNutritionData }