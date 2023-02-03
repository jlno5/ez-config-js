const fs = require('fs');

const dir = process.cwd(); // @TODO: change this bc it depends on where you start the nodeJS file like the ~ dir
const configFolder = `${dir}/configs`;
const env = process.env.NODE_ENV || 'development';
const file = env == 'production' ? configFolder + '/prod.json' : configFolder + '/dev.json';

if (!fs.existsSync(configFolder)) fs.mkdirSync(configFolder);
if (!fs.existsSync(file)) fs.writeFileSync(file, "{\n}");

const obj = require(file);

/**
 * Gives you the value of a key in the config file
 *
 * @param {string} key - The key for the element you search in the config json file
 * @returns {*} - return the value of the key or undefined
 */
const getFunction = function (key) {
    if (!key || key === "") throw new TypeError("missing required parameter");
    let value = obj[key];
    return value;
}

const setFunction = function (key, value) {
    if (!key || key === "" || !value) throw new TypeError("missing required parameter");
    let currentFileContent = require(file);
    currentFileContent[key] = value;
    fs.writeFileSync(file, JSON.stringify(currentFileContent, null, 4));
    return [key, value];
}

const hasFunction = function (key) {

}

exports.get = getFunction;
exports.set = setFunction;