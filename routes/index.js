//
//  Set of global utilities to be used by the node server
Utilities = (function(){
    return {
        string: {
            format: function(src, args) {
                var _ = require('underscore')
                , result = _.clone(src)
                , index = args.length;

                while (index--) {
                    result = result.replace(new RegExp("\\{" + index + "\\}", "gm"), args[index]);
                }

                return result;
            },

            to64: function(value) {
                return new Buffer(value).toString('base64')
            },

            from64: function(value) {
                return new Buffer(value, 'base64').toString('ascii');
            }
        }
    };
})();

//
// HTTP codes
HttpCodes = (function() {
	return {
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
	};
})();

//
// Global constant objects
MimeTypes = (function() {
    return [
        { mime: 'text/css', reg: /^data:text\/css;base64,/},
        { mime: 'text/plain', reg: /^data:text\/plain;base64,/},
        { mime: 'application/msword', reg: /^data:application\/msword;base64,/},
        { mime: 'text/html', reg: /^data:text\/html;base64,/},
        { mime: 'application/x-javascript', reg: /^data:application\/x-javascript;base64,/},
        { mime: 'application/pdf', reg: /^data:application\/pdf;base64,/},
        { mime: 'application/mspowerpoint', reg: /^data:application\/mspowerpoint;base64,/},
        { mime: 'application/vnd.ms-powerpoint', reg: /^data:application\/vnd.ms-powerpoint;base64,/},
        { mime: 'application/powerpoint', reg: /^data:application\/powerpoint;base64,/},
        { mime: 'application/x-mspowerpoint', reg: /^data:application\/x-mspowerpoint;base64,/},
        { mime: 'application/x-visio', reg: /^data:application\/x-visio;base64,/},
        { mime: 'application/x-excel', reg: /^data:application\/x-excel;base64,/},
        { mime: 'application/x-msexcel', reg: /^data:application\/x-msexcel;base64,/},
        { mime: 'application/excel', reg: /^data:application\/excel;base64,/},
        { mime: 'application/vnd.ms-excel', reg: /^data:application\/vnd.ms-excel;base64,/},
        { mime: 'application/xml', reg: /^data:application\/xml;base64,/},
        { mime: 'text/xml', reg: /^data:text\/xml;base64,/},
        { mime: 'audio/mp3', reg: /^data:audio\/mp3;base64,/},
        { mime: 'audio/mpeg', reg: /^data:audio\/mpeg;base64,/},
        { mime: 'audio/x-mpeg', reg: /^data:audio\/x-mpeg;base64,/},
        { mime: 'audio/mpeg3', reg: /^data:audio\/mpeg3;base64,/},
        { mime: 'audio/mid', reg: /^data:audio\/mid;base64,/},
        { mime: 'audio/midi', reg: /^data:audio\/midi;base64,/},
        { mime: 'audio/x-mid', reg: /^data:audio\/x-mid;base64,/},
        { mime: 'audio/x-midi', reg: /^data:audio\/x-midi;base64,/},
        { mime: 'music/crescendo', reg: /^data:music\/crescendo;base64,/},
        { mime: 'x-music/x-midi', reg: /^data:x-music\/x-midi;base64,/},
        { mime: 'application/x-midi', reg: /^data:application\/x-midi;base64,/},
        { mime: 'audio/wav', reg: /^data:audio\/wav;base64,/},
        { mime: 'audio/x-wav', reg: /^data:audio\/x-wav;base64,/},
        { mime: 'image/bmp', reg: /^data:image\/bmp;base64,/},
        { mime: 'image/x-windows-bmp', reg: /^data:image\/x-windows-bmp;base64,/},
        { mime: 'image/gif', reg: /^data:image\/gif;base64,/},
        { mime: 'image/jpeg', reg: /^data:image\/jpeg;base64,/},
        { mime: 'image/png', reg: /^data:image\/png;base64,/},
        { mime: 'image/tiff', reg: /^data:image\/tiff;base64,/},
        { mime: 'image/x-tiff', reg: /^data:image\/x-tiff;base64,/},
        { mime: 'image/x-icon', reg: /^data:image\/x-icon;base64,/},
        { mime: 'image/pict', reg: /^data:image\/pict;base64,/},
        { mime: 'image/x-quicktime', reg: /^data:image\/x-quicktime;base64,/},
        { mime: 'application/x-troff-msvideo', reg: /^data:application\/x-troff-msvideo;base64,/},
        { mime: 'video/avi', reg: /^data:video\/avi;base64,/},
        { mime: 'video/msvideo', reg: /^data:video\/msvideo;base64,/},
        { mime: 'video/x-msvideo', reg: /^data:video\/x-msvideo;base64,/},
        { mime: 'video/mpeg', reg: /^data:video\/mpeg;base64,/},
        { mime: 'video/x-mpeg', reg: /^data:video\/x-mpeg;base64,/},
        { mime: 'video/quicktime', reg: /^data:video\/quicktime;base64,/},
        { mime: 'application/x-bzip', reg: /^data:application\/x-bzip;base64,/},
        { mime: 'application/x-bzip2', reg: /^data:application\/x-bzip2;base64,/},
        { mime: 'application/x-compressed', reg: /^data:application\/x-compressed;base64,/},
        { mime: 'application/x-gzip', reg: /^data:application\/x-gzip;base64,/},
        { mime: 'multipart/x-gzip', reg: /^data:multipart\/x-gzip;base64,/},
        { mime: 'application/zip', reg: /^data:application\/zip;base64,/},
        { mime: 'application/x-zip', reg: /^data:application\/x-zip;base64,/}
    ];
})();

//
// Routes
module.exports = {
    //
    // Root route
    index: function(req, res){
      res.render('index', { title: 'File Uploader Demo', year: new Date().getFullYear() });
    },

    //
    // File upload service
	fileUpload: function(req, res) {
		if (req.body) {
			var _ = require('underscore')
                , uuid = require('uuid')
                , path = require('path')
                , fs = require('fs')
                , re = _.find(MimeTypes, function(o) { return o.mime === req.body.mime; })
                , data = req.body.data.replace(re.reg, '')
                , fileName = Utilities.string.format('{0}.{1}', [uuid.v1(), req.body.name.split('.').pop()]);

            fs.writeFile(path.join('./uploads', fileName), data, 'base64', function(err) {
                res.json({}, HttpCodes.ok.value);
            });
		} else {
            res.json({}, HttpCodes.noContent.value);
        }
	}
};




