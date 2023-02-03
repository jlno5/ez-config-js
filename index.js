const fs = require('fs');

const dir = process.cwd(); // @TODO: change this bc it depends on where you start the nodeJS file like the ~ dir
const configFolder = `${dir}/configs`;
const env = process.env.NODE_ENV || 'development';
const file = env == 'production' ? configFolder + '/prod.json' : configFolder + '/dev.json';

if (!fs.existsSync(configFolder)) fs.mkdirSync(configFolder);
if (!fs.existsSync(file)) fs.writeFileSync(file, "{\n}");

/**
 * Gives you the value of a key in the config file
 *
 * @param {string} key - The key for the element you search in the config json file
 * @returns {*} - return the value of the key or undefined
 */
const getFunction = function (key) {
    const obj = require(file);
    if (!key || key === "") throw new TypeError("missing required parameter");
    let value = obj[key];
    return value;
}

/**
 * Stores any key-value-pair in the config json file. It does override values or stores new pairs.
 * For only new pair use setNew()
 *
 * @param {string} key - The key under which the value should be stored
 * @param {any} value - The value to store in the config file
 * @returns {[string, any]} - Returns the pair
 */
const setFunction = function (key, value) {
    if (!key || key === "" || !value) throw new TypeError("missing required parameter");
    let currentFileContent = require(file);
    currentFileContent[key] = value;
    fs.writeFileSync(file, JSON.stringify(currentFileContent, null, 4));
    return [String(key), value];
}

/**
 * Stores ONLY NEW key-value-pair in the config json file.
 *
 * @param {string} key - The NEW key under which the NEW value should be stored
 * @param {any} value - The value to store in the config file
 * @returns {[string,undefined] | [null,null]} - Return null if the key does exist
 */
const setNewFunction = function (key, value) {
    if (!key || key === "" || !value) throw new TypeError("missing required parameter");
    let currentFileContent = require(file);
    if (currentFileContent[key] !== undefined) return [null, null]
    currentFileContent[key] = value;
    fs.writeFileSync(file, JSON.stringify(currentFileContent, null, 4));
    return [String(key), value];
}

/**
 * ONLY overrides any key-value-pair in the config json file.
 *
 * @param {string} key - The key of the object that should get replaced
 * @param {any} value - The new value
 * @returns {[string, any] | [null, null]} - Returns null if the key does not exist
 */
const overrideFunction = function (key, value) {
    if (!key || key === "" || !value) throw new TypeError("missing required parameter");
    let currentFileContent = require(file);
    if (currentFileContent[key] == undefined) return [null, null]
    currentFileContent[key] = value;
    fs.writeFileSync(file, JSON.stringify(currentFileContent, null, 4));
    return [String(key), value];
}

/**
 * Checks if the config file does have the provided key. // If an value for the key is stored.
 *
 * @param {string} key - The key for what you want if it exists
 * @returns {boolean} - Returns true if exists, false if not.
 */
const hasFunction = function (key) {
    if (!key || key === "") throw new TypeError("missing required parameter");
    let currentFileContent = require(file);
    if (currentFileContent[key] == undefined) return false;
    else return true;
}

exports.get = getFunction;
exports.set = setFunction;
exports.setNew = setNewFunction;
exports.override = overrideFunction;
exports.has = hasFunction;