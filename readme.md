# ez-config Node Module
> This node module lets you easily manage your configuration files and set or get some values from your config globaly.

## Introduction IMPORTABT
**You have to run the start command of your project in the project folder** \
Like your project is stored in `/home/user/project` then run `node index.js` in the project folder

## Features
* set key-value-pair
* get value of key
* supports dev and production mode

### Features in coming
1. [ ] async support

## Quick start
### Installation 
```shell
$ npm install config-simpler
$ mkdir configs
$ vi configs/dev.json 
OR
$ vi configs/prod.json
```
### Run correctly
```shell
$ cd /home/user/project
$ NODE_ENV=development node index.js
```

### use config-simpler correctly
```js
const config = require("config-simpler");
// ...
const dbAdress = config.get('MariaDB.adress');
db.connect(dbAdress, ...);

if (config.has('colorCode.red')) {...}
else {
    let [key, value] = config.setNew('colorCode.red', "#ff0000");
}

[key, value] = config.override('colorCode.red', '#ff1122'); // only if colorCode.red does exist
[key, value] = config.set('lastname', 'Doe'); // doesn't matter if lastname exists or not
```

