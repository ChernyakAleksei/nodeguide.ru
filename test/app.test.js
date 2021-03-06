
// Run $ expresso

/**
 * Module dependencies.
 */

var app = require('../app')
  , assert = require('assert');


module.exports = {
  // index page redirect to doc
  'GET /': function(){
    assert.response(app,
      { url: '/' },
      {
        status: 302,
        headers: {
          'Content-Type': 'text/html',
          'Location': 'http://127.0.0.1:5555/doc/'
        }
      }
    );
  },

  // correct redirect for old URLs
  // no trailing slash, future redirect fix it (see next test)
  'GET /doc/dailyjs/web-app-5/': function() {
    assert.response(app,
      { url: '/doc/dailyjs/web-app-5/' },
      {
        status: 302,
        headers: {
          'Content-Type': 'text/html',
          'Location': 'http://127.0.0.1:5555/doc/dailyjs-nodepad/node-tutorial-5'
        }
      }
    );
  },

  // redirect no trailing slash
  'GET /doc/dailyjs-nodepad/node-tutorial-5': function() {
    assert.response(app,
      { url: '/doc/dailyjs-nodepad/node-tutorial-5' },
      {
        status: 302,
        headers: {
          'Content-Type': 'text/html',
          'Location': 'http://127.0.0.1:5555/doc/dailyjs-nodepad/node-tutorial-5/'
        }
      }
    );
  },

  // correct redirect for old URLs
  'GET /doc/dailyjs/index': function() {
    assert.response(app,
      { url: '/doc/dailyjs/index' },
      {
        status: 302,
        headers: {
          'Content-Type': 'text/html',
          'Location': 'http://127.0.0.1:5555/doc/dailyjs-nodepad/index'
        }
      }
    );
  },

  // redirect /doc --> /doc/
  'GET /doc': function() {
    assert.response(app,
      { url: '/doc' },
      {
        status: 302,
        headers: {
          'Content-Type': 'text/html',
          'Location': 'http://127.0.0.1:5555/doc/'
        }
      }
    );
  },

  // handle no trailing slash for sector index page
  'GET /doc/dailyjs-nodepad/index': function() {
    assert.response(app,
      { url: '/doc/dailyjs-nodepad/index' },
      {
        status: 200,
        headers: {'Content-Type': 'text/html; charset=utf-8'}
      },
      function(res) {
        assert.includes(res.body, '<title>Делаем веб приложение на Node.js</title>');
      }
    );
  },

  // existance sitemap.xml
  'GET /sitemap.xml': function() {
    assert.response(app,
      { url: '/sitemap.xml' },
      {
        status: 200,
        headers: {'Content-Type': 'application/xml'}
      },
      function(res) {
        assert.includes(res.body, '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      }
    );
  },
};
