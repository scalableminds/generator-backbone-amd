### define
app : app
backbone : Backbone
jquery : $
underscore : _
###

class <%= _.classify(name) %>Model extends Backbone.Model




  class @Collection extends Backbone.Collection

    model : <%= _.classify(name) %>Model





