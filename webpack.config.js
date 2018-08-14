'use strict';

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

// Lista de ambientes permitidos
const allowedEnvs = ['dev', 'dist', 'test'];

// Establece el ambiente correcto
let env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}
process.env.REACT_WEBPACK_ENV = env;

/**
 * Crea la configuración de la carpeta web
 * @param  
 * @return 
 */
function buildConfig(wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : 'dev';
  let config = require(path.join(__dirname, 'cfg/' + validEnv));
  return config;
}

module.exports = buildConfig(env);
