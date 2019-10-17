/* eslint-disable class-methods-use-this */
const { Command, flags } = require('@oclif/command');
const { cli } = require('cli-ux');
const { createServer } = require('http');
const stoppable = require('stoppable');
const { oauthLoginUrl } = require('@octokit/oauth-login-url');


const OAUTH_CLIENT_ID = 'e201985403875db868be';

class CliLoginDemoCommand extends Command {
  async run() {
    cli.action.start('Please login to the site opening in your browser with your GitHub credentials');

    const token = await new Promise((resolve) => {
      const server = stoppable(createServer((request, response) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        let body = '';
        request.on('data', (chunk) => {
          body += chunk.toString();
        });
        request.on('end', () => {
          resolve(JSON.parse(body).token);
          cli.action.stop('login successful');

          response.end();
          server.stop();
        });
      }));

      server.listen(0, () => {
        const { url } = oauthLoginUrl({
          clientId: OAUTH_CLIENT_ID,
          state: server.address().port,
        });
        cli.open(url);
      });
    });

    this.log('token', token);
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
