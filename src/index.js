const { Command, flags } = require('@oclif/command');

class CliLoginDemoCommand extends Command {
  async run() {
    this.log('hello demo');
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
