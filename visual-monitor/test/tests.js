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
    'resolution' : '1024x768'
  },
  'ie11': {
    project: projectName,
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  },
  'iphone5': {
    project: projectName,
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'chromeOptions': {
      'mobileEmulation': {
        'deviceName': 'Apple iPhone 5'
      }
    }
  }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://www.cri.co.il';

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the homepage page',function(done) {
    client
      .url(baseUrl)
      // Page loaded.
      .pause(2000)
      .webdrivercss(testName + '.homepage', {
        name: '1',
        exclude:
          [
            // Top carousel.
            '.carousel-inner',
            // Video.
            '.specials .mid-column img',
            // China on map.
            '.specials .right-column img',
            // Sidebar related-articles.
            '.homepage-promoted-articles .list-block',
            // Main article.
            '.more_articles .list-block',
            // Facebook likes.
            '.fb-like',
          ],
        remove:
          [
            // Remove all the articles.
            '.more_articles',
            // Main article tab subject.
            'div.triangle',
            '.list-block .page-mark',
            // Sidebar article.
            '.list-block .page-mark-big',
          ],
        screenWidth: selectedCaps == 'chrome' ? [1200] : undefined
      }, shoovWebdrivercss.processResults)
      .call(done);
  });

  /*it('should show the about page',function(done) {
    client
      .url(baseUrl + '/about')
      .webdrivercss(testName + '.about', {
        name: '1',
        exclude:
          [
            // Facebook likes.
            '.fb-like',
          ],
        remove:
          [
            //Sidebar writers.
            '.pane-our-writers',
            // Facebook text.
            '.social-networks .fb-like',
            // Facebook comments.
            '.fb-comments .fb_ltr',
          ],
        screenWidth: selectedCaps == 'chrome' ? [320, 1200] : undefined
      }, shoovWebdrivercss.processResults)
      .call(done);
  });

  it('should show the chinese cuisine page',function(done) {
    client
      .url(baseUrl + '/categories/המטבח-הסיני')
      // Page loaded.
      .pause(2000)
      .webdrivercss(testName + '.chinese_cuisine', {
        name: '1',
        exclude:
          [
            // Top carousel.
            '.pane-carousel',
            // Main article.
            '.more_articles .list-block',
            // Sidebar related articles.
            '.related-articles .list-block',
            // Facebook likes.
            '.fb-like',
          ],
        remove:
          [
            // Main article tab subject.
            'div.triangle',
            'span.page-mark',
            // Sidebar article.
            '.page-mark-big',
          ],
        screenWidth: selectedCaps == 'chrome' ? [320, 1200] : undefined
      }, shoovWebdrivercss.processResults)
      .call(done);
  });

  it('should show the china wiki page',function(done) {
    client
      .url(baseUrl + '/categories/ויקי-סין')
      .webdrivercss(testName + '.wiki', {
        name: '1',
        exclude:
          [
            // Main article.
            '.more_articles .list-block',
            // Sidebar related articles.
            '.related-articles .list-block',
            // Facebook likes.
            '.fb-like',
          ],
        remove:
          [
            // Main article tab subject.
            '.page-mark',
            // Sidebar article.
            '.page-mark-big',
          ],
        screenWidth: selectedCaps == 'chrome' ? [320, 1200] : undefined
      }, shoovWebdrivercss.processResults)
      .call(done);
  });

  it('should show the excursions page',function(done) {
    client
      .url(baseUrl + '/categories/טיולים')
      // Page loaded.
      .pause(2000)
      .webdrivercss(testName + '.excursions', {
        name: '1',
        exclude:
          [
            // Sidebar map.
            '#map',
            // Main article.
            '.more_articles .list-block',
            // Facebook likes.
            '.fb-like',
          ],
        remove:
          [
            // Main article tab subject.
            'div.triangle',
            '.page-mark',
            // Sidebar article.
            '.page-mark-big',
          ],
        screenWidth: selectedCaps == 'chrome' ? [320, 1200] : undefined
      }, shoovWebdrivercss.processResults)
      .call(done);
  });

  it('should show the Visa page',function(done) {
    client
      .url(baseUrl + '/content/סידורי-ויזה')
      .webdrivercss(testName + '.visa', {
        name: '1',
        exclude:
          [
            // Facebook likes.
            '.fb-like',
            // Sidebar related articles.
            '.pane-articles .list-block',
          ],
        remove:
          [
            // Facebook comments.
            '.fb-comments .fb_ltr',
          ],
        screenWidth: selectedCaps == 'chrome' ? [320, 1200] : undefined
      }, shoovWebdrivercss.processResults)
      .call(done);
  });*/

});
