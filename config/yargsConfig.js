const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .option('website', {
    alias: 'w',
    type: 'string',
    description: 'Website URL',
    demandOption: true
  })
  .option('css', {
    alias: 'c',
    type: 'boolean',
    description: 'Download CSS files',
    default: true
  })
  .option('js', {
    alias: 'j',
    type: 'boolean',
    description: 'Download JS files',
    default: true
  })
  .argv;

module.exports = { argv };
