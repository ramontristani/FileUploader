(function() {

	FileModel = Backbone.Model.extend({
		urlRoot: '/services/v1/io',
		defaults: {
			name: '',
			mime: '',
			icon: '',
			modified: '',
			data: '',
			size: 0,
		}
	});

	Files = Backbone.Collection.extend({
		url: '/services/v1/io',
		model: FileModel
	});

})();