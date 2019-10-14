const { Command, flags } = require('@oclif/command');
const open = require('open');


const oauthAppUrl = 'https://test.com';

class CliLoginDemoCommand extends Command {
  async run() {
    this.log('Please login to the site opening in your browser with your GitHub credentials...');

    open(oauthAppUrl);
  }
}

CliLoginDemoCommand.description = `Describe the command here
...
Extra documentation goes here
`;

CliLoginDemoCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
};

module.exports = CliLoginDemoCommand;
