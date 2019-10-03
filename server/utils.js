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

module.exports = { getNestedObject }