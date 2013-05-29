var App = new (Backbone.View.extend({
    Models: {},
    Views: {},
    Collections: {},
    start: function(){
      Backbone.history.start({pushState: true});
    } 
}))({el: document.body});

App.Models.Photo = Backbone.Model.extend({}); 

App.Views.Photo = Backbone.View.extend({});

App.Collections.Photos = Backbone.Collection.extend({}); 

App.Views.Photos = Backbone.View.extend({});

App.Router = Backbone.Router.extend({});