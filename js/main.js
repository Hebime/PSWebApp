var UserModel = Backbone.Model.extend({

});

var UserView = Backbone.View.extend({
  render: function(){
  }
});

var PhotoModel = Backbone.Model.extend({

});

var PhotoList = Backbone.Collection.extend({
  model: PhotoModel,
});

var PhotoView = Backbone.View.extend({
  template: _.template('<img src="img/<%= picture %>" />'),
  className: "picture",
  initialize: function(){
    this.model.on('change', this.render, this);
  },
  render: function(){
    $(this.el).html(this.template(this.model.attributes));
    return this;
  }
});

var PhotoListView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('add', this.addOne, this);
  },
  addAll: function(){
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
  },
  addOne: function(photoItem){
    var photoView = new PhotoView({model: photoItem});
    this.$el.append(photoView.render().el);
  },
  render: function(){
    this.addAll();
    return this;
  }
});

var EventModel = Backbone.Model.extend({

});

var EventList = Backbone.Collection.extend({
  model: EventModel
});

var EventView = Backbone.View.extend({
  template: _.template('<a href="#events/<%= id %>"><%= name %></a>'),
  tagName: "li",
  initialize: function(){
    this.model.on('change', this.render, this);
  },
  render: function(){
    $(this.el).html(this.template(this.model.attributes));
    return this;
  }
});

var EventListView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('add', this.addOne, this);
  },
  addAll: function(){
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
  },
  addOne: function(eventItem){
    var eventView = new EventView({model: eventItem});
    this.$el.append(eventView.render().el);
  },
  render: function(){
    this.addAll();
    return this;
  }
});

var RouterApp = new (Backbone.Router.extend({
  routes: {"": "index", "events/:id": "show"},
  initialize: function(){
    this.eventList = new EventList(DataEventList);
    this.eventListView = new EventListView({collection: this.eventList});
  },
  start: function(){
    Backbone.history.start();
  },
  index: function(){
    this.eventListView.render();
    $("#events").html(this.eventListView.el);
    $("#main").empty();
  },
  show: function(id){
    this.eventListView.render();
    $("#events").html(this.eventListView.el);

    this.photoList = new PhotoList(DataPhotoList[id-1]);
    this.photoListView = new PhotoListView({collection: this.photoList});
    this.photoListView.render();
    $("#main").html(this.photoListView.el);
  }
}));

$(function(){ 
  RouterApp.start(); 
});


