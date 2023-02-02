const fs = require('fs');

const dir = process.cwd(); // @TODO: change this bc it depends on where you start the nodeJS file like the ~ dir
const configFolder = fs.existsSync(`${dir}/configs`);
const env = process.env.NODE_ENV || 'production';



exports = dir