### define
app : app
backbone : Backbone
underscore : _
templates : templates
###


class <%= _.classify(name) %>View extends Backbone.View

  template : templates.<%= _.slugify(name) %>


  render : ->
