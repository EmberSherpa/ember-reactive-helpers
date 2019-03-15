/* jshint node:true */

var execSync = require('child_process').execSync;

function runCommand(command, log) {
  log = (log === undefined) ? false : log;

  if(log) {
    console.log('running: ' + command); // eslint-disable-line
  }

  var output = execSync(command, { encoding: 'utf8' }).toString().trim();

  if(log) {
    console.log(output); // eslint-disable-line
  }

  return output;
}

module.exports = {
  init: function() {
    this._previousVersion = require('../package.json').version;
  },

  afterPush: function(project, tags) {
    runCommand('ember genie:changelog --write=true --version=' + this._previousVersion +
        ' --new-version=' + tags.next, true);
  },
  afterPublish: function(project, versions) {
    runCommand('ember github-pages:commit --message "Released ' + versions.next + '"', true);
    runCommand('git push origin gh-pages:gh-pages', true);
  },
  publish: true
};
