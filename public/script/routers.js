(function($){
    //
    // Main client application router
    Router = Backbone.Router.extend({
        currentView: null,
        routes: {
            '': 'upload'
        },

        reset: function(view) {
            var self = this;
            $('#alert').hide();
            if (null !== self.currentView) {
                self.currentView.undelegateEvents();
            }

            self.currentView = view;
            self.currentView.render(function(html) {
                $('#content').hide();
                $('#content').html(html);
                $('#content').fadeIn('medium');
            });
        },

        upload: function() {
            var self = this;
            self.reset(new FileUploadView({model: {}}));
        }
    });
}(jQuery));