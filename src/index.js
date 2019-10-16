/* eslint-disable class-methods-use-this */
const { Command, flags } = require('@oclif/command');
const { cli } = require('cli-ux');
const { createServer } = require('http');
const stoppable = require('stoppable');


const { oauthLoginUrl } = require("@octokit/oauth-login-url");

const OAUTH_CLIENT_ID = 'e201985403875db868be'

class CliLoginDemoCommand extends Command {
  async run() {
    cli.action.start('Please login to the site opening in your browser with your GitHub credentials');

    await new Promise((resolve) => {
      const server = stoppable(createServer((request, response) => {
        // TODO: get access token from request

        response.end('success');

        server.stop(() => {
          cli.action.stop('login successful');

          resolve();
        });
      }));

      server.listen(0, () => cli.open(`${oauthAppUrl}?port=${server.address().port}`));
    });
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
