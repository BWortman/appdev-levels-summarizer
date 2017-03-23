'use strict';

const app = require('./app/app');

const argv = require('yargs')
  .usage('Usage: $0 -src -targ')
  .default('src', './')
  .default('targ', './xsum_out.xlsx')
  .alias('src', 'source')
  .describe('src', 'Source directory name')
  .alias('targ', 'target')
  .describe('targ', 'Target output filenamne')
  .help('h')
  .alias('h', 'help')
  .argv;

app.execute(argv);