Package.describe({
	name: 'rkhaslarov:simple-pagination',
	version: '1.0.5',
	summary: 'This package provides a simple materialize pagination based on Blaze templating.',
	git: '',
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.2.1');
	api.use(['ecmascript']);
  	api.use(['templating', 'underscore', 'deps', 'jquery', 'blaze'], 'client');

	api.addFiles(['client/pagination.html'], 'client');
	api.addFiles(['client/pagination.js'], 'client');
});