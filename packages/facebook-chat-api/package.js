Package.describe({
  name: "valiafetisov:fbapi",
  summary: "facebook chat api",
  version: "1.0.8",
});

Npm.depends({
  "facebook-chat-api": "1.0.7"
});

Package.on_use(function (api) {
  api.add_files('index.js', 'server');
  api.export('facebook');
});