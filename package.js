Package.describe({
  name: 'dispatch:mocha',
  summary: 'Run package or app tests with Mocha, using a headless browser for the client tests',
  git: 'https://github.com/DispatchMe/meteor-mocha.git',
  version: '0.2.0',
  testOnly: true,
});

Package.onUse(function onUse(api) {
  api.use([
    'practicalmeteor:mocha-core@1.0.0',
    'ecmascript@0.3.0',
  ]);

  api.use([
    'aldeed:browser-tests@0.1.0'
  ], 'server');

  api.mainModule('client.js', 'client');
  api.mainModule('server.js', 'server');
});
