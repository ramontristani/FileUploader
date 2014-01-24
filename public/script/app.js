(function() {

	var app = Global.app;
    app.Router = new Router();
    Backbone.history.start();

    $(document).on('click', 'a:not([data-bypass])', function(event) {
        var href = $(this).attr('href');
        var protocol = this.protocol + '//';

        // Ensure roter navigation
        if (href && href.slice(0, protocol.length) !== protocol && href.indexOf('javascript:') !== 0) {
            // Prevent page refresh
            event.preventDefault();

            // Navigate
            Backbone.history.navigate(href, true);
        }
    });

})();