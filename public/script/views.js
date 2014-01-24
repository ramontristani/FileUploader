(function() {
	var _files = null;
	var fetchIcon = function(type) {
		var result = null;

		if (_.intersection([type], Global.constants.mimes.document.types).length !== 0) {
	        result = Global.constants.mimes.document.icon;
	    } else if (_.intersection([type], Global.constants.mimes.audio.types).length !== 0) {
	        result = Global.constants.mimes.audio.icon;
	    } else if (_.intersection([type], Global.constants.mimes.image.types).length !== 0) {
	        result = Global.constants.mimes.image.icon;
	    } else if (_.intersection([type], Global.constants.mimes.video.types).length !== 0) {
	        result = Global.constants.mimes.video.icon;
	    } else if (_.intersection([type], Global.constants.mimes.compression.types).length !== 0) {
	        result = Global.constants.mimes.compression.icon;
	    }

		return result;
	};

	// This should be placed in a sub view after Marionette port.
	// HTML should never be emitted from code. Bad juju!
	var renderFileListItem = function(data) {
		var format = '<li class="list-group-item"><div class="row"><div class="col-md-10"><span class="{0}"></span><strong>{1}</strong> ({2}) - {3}, Last Modified: {4}</div><div class="col-md-2"><button class="btn btn-danger btn-sm remove" data-tag="{5}"><span class="glyphicon glyphicon-trash"></span>Remove</button></div></div></li>'

	    $('#fileList').append(Global.utils.string.format(format, [
	        data.icon,
	        data.name,
	        data.mime,
	        Global.utils.string.toSize(data.size),
	        data.modified,
	        data.name
	    ]));

        $('#fileCount').text(Global.utils.string.format('Files ({0})', [$('ul#fileList li').length]));
	};

	// File upload view
	FileUploadView = Backbone.View.extend({
		title: Global.utils.string.format('{0} - Upload', [Global.options.appTitle]),
		template: '/templates/upload.html',
		events: {
			'click .remove'		: 'remove',
			'click #clear'		: 'clear',
			'click #upload'		: 'upload'
		},

		initialize: function() {
			var self = this;

			self.fileApiSupported = window.File 
				&& window.FileReader 
				&& window.FileList
				&& window.Blob;
		},

		render: function(done) {
			var self = this;
            document.title = self.title;

            Global.utils.template.fetchTemplate(self.template, function(template) {
                // Uncomment when Backbone model has been passed to view
                // self.el.innerHTML = template({model: self.model.toJSON()});
                self.el.innerHTML = template({model: {}});

                if (_.isFunction(done)) {
                    done(self.el);

                    // Toggle utility availability
                    $('#ajaxLoader').hide();
                    if (self.fileApiSupported) {
                        $('#unsupported').hide();
                        $('#utils').hide();

                        var dropZone = document.getElementById('dropzone');
                        if (dropZone) {
                            dropZone.addEventListener('dragover', self.dragover, false);
                            dropZone.addEventListener('drop', self.drop, false);
                        }

                    } else {
                        $('#supported').hide();
                    }
                }
            });
		},

		dragover: function(e) {
			e.stopPropagation();
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';
			$('#dropzone').addClass('focusglow');
		},

		dragleave: function(e) {
			e.stopPropagation();
			e.preventDefault();
			e.dataTransfer.dropEffect = 'none';
			$('#dropzone').removeClass('focusglow');
		},

		drop: function(e) {
			e.stopPropagation();
            e.preventDefault();
            _files = new Files();

            $('#ajaxLoader').show();
            $('#fileCount').show();
            $('#utils').hide();
            $('#fileList').empty();

            var droppedFiles = _.reject(e.dataTransfer.files, function(f) { return f.size > Global.options.maxFileSize; });

            if (droppedFiles.length !== e.dataTransfer.files.length) {
                var content = Global.utils.string.format('<strong>Warning: </strong> {0}.',
                    ['Not all files have been accepted. The maximum file size limit is 50 MB. Only the listed files will be processed.']);
                
                Global.utils.alerts.createAlert('alert-warning', content);
                $('#dropzone').removeClass('focusglow');
                $('#ajaxLoader').hide();
            }


            for (var i = 0, f; f = droppedFiles[i]; i++) {
                if (f.size < Global.options.maxFileSize) {
                    var reader = new FileReader();
                    reader.onload = (function(droppedFile) {
                        return function(evt) {                            
                            var data = { 
                                name: droppedFile.name, 
                                mime: droppedFile.type, 
                                icon: fetchIcon(droppedFile.type), 
                                modified: droppedFile.lastModifiedDate ? droppedFile.lastModifiedDate.toLocaleDateString() : 'N/A',
                                data: evt.target.result, 
                                size: droppedFile.size 
                            }, model = new FileModel(data);

                            if (data.icon) {
                                renderFileListItem(data);
                                _files.add(model);

                                if (i === droppedFiles.length) {
                                    $('#ajaxLoader').hide();
                                    $('#utils').show();
                                    $('#dropzone').removeClass('focusglow');
                                }
                            }
                        };

                    })(f);

                    reader.readAsDataURL(f);
                }
            }
		},

		remove: function(e) {
			e.preventDefault();
            
            _files.remove(_files.where({name: $(e.target).data('tag')}));
            $('#fileList').empty();
            
            var json = _files.toJSON();
            for(var i = 0; i < json.length; i++) {
            	renderFileListItem(json[i]);
            }

            if (_files.length === 0) {
            	$('#utils').hide();
            	$('#fileCount').hide();
            }
		},

		clear: function(e) {
			e.preventDefault();
            _files = new Files();
            $('#fileList').empty();
            $('#utils').hide();
            $('#fileCount').hide();
		},

		upload: function(e) {
			e.preventDefault();
            if (_files.length > 0) {
                $('#ajaxLoader').show();
                for(var i = 0; i < _files.length; i++) {
                    var model = _files.at(i);

                    model.save(null, {
                        success: function(model, response) {
                        	_files.remove(_files.where({ fileName: model.toJSON().fileName }));
                        	$('#fileList').empty();
                            
                            var json = _files.toJSON();
                            for(var i = 0; i < json.length; i++) {
                                renderFileListItem(json[i]);
                            }

                            if (_files.length === 0) {
                                $('#ajaxLoader').hide();
                                $('#utils').hide();
                                $('#fileCount').hide();
                            }
                        },
                        error: function(model, response) {
                            console.log('ERROR!!');
                        }
                    });
                }
            }
		}

	});

})();