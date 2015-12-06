'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');
var projectName = 'CRI';

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=iphone5 mocha

var capsConfig = {
    'chrome': {
      project: projectName,
      'browser' : 'Chrome',
      'browser_version' : '42.0',
      'os' : 'OS X',
      'os_version' : 'Yosemite',
      'resolution' : '1280x960'
    },
    'ie11': {
      project: projectName,
      'browser' : 'IE',
      'browser_version' : '11.0',
      'os' : 'Windows',
      'os_version' : '7',
      'resolution' : '1280x800'
    }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://live-cri.gotpantheon.com';

describe('Visual monitor sidebar testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the sidebar navigation in widescreen',function(done) {
    client
      .url(baseUrl)
      .click('a.flip')
      .webdrivercss(testName + '.sidebar-flip', {
        name: '1',
        elem: '.side.front'
      },
      shoovWebdrivercss.processResults)
      .call(done);
  });
});
