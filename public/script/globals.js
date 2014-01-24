(function($) {

	Global = {
		app: _.extend({}, Backbone.Events),

		options: {
			appTitle: 'File Uploader',
			maxFileSize: 52428800
		},

		utils: {
			string: {
				format: function(format, args) { 
					var result = _.clone(format);
	                var index = args.length;
	                while (index--) {
	                    result = result.replace(new RegExp("\\{" + index + "\\}", "gm"), args[index]);
	                }

	                return result;
				},

				toSize: function(bytes) {
					var result = '0 Bytes';
	                if (bytes !== 0) { 
	                    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
	                        , i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

	                    result = Math.round(bytes / Math.pow(1024, i), 2) + sizes[i];
	                };

	                return result;
				}
			},

			css: {
				exchangeClass: function(element, remove, attach) {
					$(element).removeClass(remove);
					$(element).addClass(attach);
				}
			},

			alerts: {
                createAlert: function(cssClass, markup) {
                    var classes = ['alert-success', 'alert-info', 'alert-warning', 'alert-danger'];
                    for(var i = 0; i < classes.length; i++) {
                        $('#alert').removeClass(classes[i]);
                    }

                    $('#alert').addClass(cssClass);
                    $('#alertContent').html(markup);
                    $('#alert').toggle('slow');
                }
            },

			template: {
				fetchTemplate: function(path, done) { 
					var jsTemplate = window.jsTemplate = window.jsTemplate || {};
		            var deferred = new $.Deferred();
					if (jsTemplate[path]) {
		                if (_.isFunction(done)) {
		                    done(jsTemplate[path]);
		                }

		                return deferred.resolve(jsTemplate[path]);
		            }

		            $.ajax({
		                url: path,
		                type: 'GET',
		                dataType: 'text',
		                cache: false,
		                global: false,
		                success: function(content) {
		                    jsTemplate[path] = _.template(content);

		                    // Set jsTemplate cache and return the template
		                    if (_.isFunction(done)) {
		                        done(jsTemplate[path]);
		                    }

		                    // Resolve deferred template
		                    deferred.resolve(jsTemplate[path]);
		                }
		            });

		            return deferred.promise();
				}
			}

		},

		constants: {
	        httpCodes: {
	            ok: {
	                description: 'Ok',
	                value: 200
	            },
	            created: {
	                description: 'Created',
	                value: 201
	            },
	            accepted: {
	                description: 'Accepted',
	                value: 202
	            },
	            noContent: {
	                description: 'No Content',
	                value: 204
	            },
	            notModified: {
	                description: 'Not Modified',
	                value: 304
	            },
	            badRequest: {
	                description: 'Bad Request',
	                value: 400
	            },
	            unauthorized: {
	                description: 'Unauthorized',
	                value: 401
	            },
	            forbidden: {
	                description: 'Forbidden',
	                value: 403
	            },
	            notFound: {
	                description: 'Not Found',
	                value: 404
	            },
	            notAllowed: {
	                description: 'Not Allowed',
	                value: 405
	            },
	            internalServerFailure: {
	                description: 'Internal Server Failure',
	                value: 500
	            }
	        },

	        mimes: {
	            document: {
	                types: [
	                    'text/css',
	                    'text/plain',
	                    'application/msword',
	                    'text/html',
	                    'application/x-javascript',
	                    'application/pdf',
	                    'application/mspowerpoint',
	                    'application/vnd.ms-powerpoint',
	                    'application/powerpoint',
	                    'application/x-mspowerpoint',
	                    'application/x-visio',
	                    'application/x-excel',
	                    'application/x-msexcel',
	                    'application/excel',
	                    'application/vnd.ms-excel',
	                    'application/xml',
	                    'text/xml'
	                ],
	                icon: 'glyphicon glyphicon-file'
	            },

	            audio: {
	                types: [
	                    'audio/mp3',
	                    'audio/mpeg',
	                    'audio/x-mpeg',
	                    'audio/mpeg3',
	                    'audio/mid',
	                    'audio/midi',
	                    'audio/x-mid',
	                    'audio/x-midi',
	                    'music/crescendo',
	                    'x-music/x-midi',
	                    'application/x-midi',
	                    'audio/wav',
	                    'audio/x-wav'
	                ],
	                icon: 'glyphicon glyphicon-headphones'
	            },

	            image: {
	                types: [
	                    'image/bmp',
	                    'image/x-windows-bmp',
	                    'image/gif',
	                    'image/jpeg',
	                    'image/png',
	                    'image/tiff',
	                    'image/x-tiff',
	                    'image/x-icon',
	                    'image/pict',
	                    'image/x-quicktime'
	                ],
	                icon: 'glyphicon glyphicon-picture'
	            },

	            video: {
	                types: [
	                    'application/x-troff-msvideo',
	                    'video/avi',
	                    'video/msvideo',
	                    'video/x-msvideo',
	                    'video/mpeg',
	                    'video/x-mpeg',
	                    'video/quicktime'
	                ],
	                icon: 'glyphicon glyphicon-facetime-video'
	            },

	            compression: {
	                types: [
	                    'application/x-bzip',
	                    'application/x-bzip2',
	                    'application/x-compressed',
	                    'application/x-gzip',
	                    'multipart/x-gzip',
	                    'application/zip',
	                    'application/x-zip'
	                ],
	                icon: 'glyphicon glyphicon-compressed'
	            }
	        }
	    }
	};

})(jQuery);